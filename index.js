var mousePosition = require('mouse-position');
var clamp = require('clamp');

function Seekbar(createOpts) {
  if (!createOpts) {
    throw new Error('No `createOpts` passed to Seekbar.');
  }

  var {
    theWindow,
    mediaElements,
    min,
    max,
    initValue,
    width
  } = createOpts;

  if (!mediaElements || !Array.isArray(mediaElements)) {
    throw new Error('No `mediaElements` provided to Seekbar.');
  }

  if (!theWindow) {
    theWindow = window;
  }
  if (!width) {
    width = '100%';
  }
  var unit = '%';
  if (width.length > 0 && width.charAt(width.length - 1) !== '%') {
    unit = 'px';
  }

  var value = initValue;
  var seeking = false;

  var doc = theWindow.document;

  var {
    seekbarEl,
    runnerEl,
    turtleEl
  } = createDOMElements(doc, width);

  var mouse = mousePosition(runnerEl, theWindow);

  if (isNaN(value)) {
    value = 0;
  }

  function getValue() {
    return value;
  }

  function getEl() {
    return seekbarEl;
  }

  function getTurtleEl() {
    return turtleEl;
  }

  function getRunnerEl() {
    return runnerEl;
  }

  function setUpListeners() {
    turtleEl.addEventListener('mousedown', startSeek);
    turtleEl.addEventListener('mouseup', endSeek);
    mouse.on('move', respondToMove);
  }

  function startSeek() {
    // TODO: Add 'seeking' class to turtleEl.
    console.log('Turtle mousedown\'d!');    
    seeking = true;
  }

  function endSeek() {
    seeking = false;
  }

  function respondToMove() {
    if (!seeking) {
      return;
    }

    var bounds = outer.getBoundingClientRect()
    var ratio = clamp(mouse.x / bounds.width, 0, 1);

    if (unit === '%') {
      turtleEl.style.left = ratio * 100 + '%';
    }
    else {
      turtleEl.style.left = ratio * width + 'px';
    }
  }

  return {
    getValue: getValue,
    el: getEl,
    getTurtleEl: getTurtleEl,
    getRunnerEl: getRunnerEl
  };
}

function createDOMElements(doc, width) {
  var seekbarEl = doc.createElement('div');
  seekbarEl.classList.add('videowall-seekbar');
  setSeekbarStyles(seekbarEl, width);

  var runnerEl = doc.createElement('div');
  runnerEl.classList.add('videowall-seekbar-runner');
  setRunnerStyles(runnerEl);

  var turtleEl = doc.createElement('div');
  turtleEl.classList.add('videowall-seekbar-turtle');
  setTurtleStyles(turtleEl);

  seekbarEl.appendChild(runnerEl);
  seekbarEl.appendChild(turtleEl);

  return {
    seekbarEl,
    runnerEl,
    turtleEl
  };
}

function setSeekbarStyles(el, width) {
  el.style.position = 'relative';
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.display = 'inline-block';
  el.style.width = width;
}

function setRunnerStyles(el) {
  el.style.position = 'absolute';
  el.style.width = '100%';
}

function setTurtleStyles(el) {
  el.style.position = 'absolute';
  el.style.width = '44px';
}

module.exports = Seekbar;
