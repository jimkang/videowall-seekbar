function Seekbar(createOpts) {
  if (!createOpts) {
    throw new Error('No `createOpts` passed to Seekbar.');
  }

  var {
    doc,
    mediaElements,
    min,
    max,
    initValue,
    width
  } = createOpts;

  if (!mediaElements || !Array.isArray(mediaElements)) {
    throw new Error('No `mediaElements` provided to Seekbar.');
  }

  if (!doc) {
    doc = window.document;
  }
  if (!width) {
    width = '100%';
  }

  var {
    seekbarEl,
    runnerEl,
    turtleEl
  } = createDOMElements(doc);

  var value = initValue;

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

  function createDOMElements(doc) {
    var seekbarEl = doc.createElement('div');
    seekbarEl.classList.add('videowall-seekbar');
    setSeekbarStyles(seekbarEl, width);

    var runnerEl = doc.createElement('div');
    runnerEl.classList.add('videowall-seekbar-runner');
    setRunnerStyles(runnerEl);

    var turtleEl = doc.createElement('div');
    turtleEl.classList.add('videowall-seekbar-turtle');
    setTurtleStyles(turtleEl);

    turtleEl.addEventListener('mousedown', logIt);

    function logIt() {
      console.log('Turtle mousedown\'d!');
    }

    seekbarEl.appendChild(runnerEl);
    seekbarEl.appendChild(turtleEl);

    return {
      seekbarEl,
      runnerEl,
      turtleEl
    };
  }  

  var div = doc.createElement('div');
  div.textContent = 'Hello';
  doc.body.appendChild(div);

  return {
    getValue: getValue,
    el: getEl,
    getTurtleEl: getTurtleEl,
    getRunnerEl: getRunnerEl
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
