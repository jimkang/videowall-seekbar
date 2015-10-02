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
    width,
    unit
  } = createOpts;

  if (!mediaElements || !Array.isArray(mediaElements)) {
    throw new Error('No `mediaElements` provided to Seekbar.');
  }

  if (!theWindow) {
    theWindow = window;
  }
  if (!unit) {
    unit = '%';
  }
  if (width) {
    width = parseInt(width, 10);
  }
  if (!width) {
    width = 100;
  }

  var value = initValue;
  var seeking = false;

  var doc = theWindow.document;

  var {
    seekbarEl,
    runnerEl,
    turtleEl
  } = createDOMElements(doc, width, unit);

  var mouse = mousePosition(theWindow, seekbarEl);
  setUpListeners();

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

    var bounds = runnerEl.getBoundingClientRect()
    var ratio = clamp(mouse[0] / bounds.width, 0, 1);
    setValue(max * ratio);
  }

  function setValue(newValue) {
    var roundedValue = clamp(newValue, min, max);
    if (roundedValue !== value) {
      value = roundedValue;
      renderValue();
    }
  }

  function renderValue() {
    var ratio = value * 1.0 / max;

    if (unit === '%') {
      turtleEl.style.left = ratio * 100 + '%';
    }
    else {
      turtleEl.style.left = ratio * width + 'px';
    }
  }

  return {
    getValue: getValue,
    setValue: setValue,
    el: getEl,
    getTurtleEl: getTurtleEl,
    getRunnerEl: getRunnerEl
  };
}

function createDOMElements(doc, width, unit) {
  var seekbarEl = doc.createElement('div');
  seekbarEl.classList.add('videowall-seekbar');
  setSeekbarStyles(seekbarEl, width, unit);

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

function setSeekbarStyles(el, width, unit) {
  el.style.position = 'relative';
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.display = 'inline-block';
  el.style.width = width + unit;
}

function setRunnerStyles(el) {
  el.style.position = 'absolute';
  el.style.width = '100%';
}

function setTurtleStyles(el) {
  el.style.position = 'absolute';
}

module.exports = Seekbar;
