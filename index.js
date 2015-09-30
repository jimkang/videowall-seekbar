function Seekbar(createOpts) {
  if (!createOpts) {
    throw new Error('No `createOpts` passed to Seekbar.');
  }

  var {
    doc,
    mediaElements,
    min,
    max,
    initValue
  } = createOpts;

  if (!mediaElements || !Array.isArray(mediaElements)) {
    throw new Error('No `mediaElements` provided to Seekbar.');
  }

  if (!doc) {
    doc = window.document;
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

function createDOMElements(doc) {
  var seekbarEl = doc.createElement('div');
  seekbarEl.classList.add('videowall-seekbar');
  setSeekbarStyles(seekbarEl);

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

function setSeekbarStyles(el) {
  el.style.position = 'relative';
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.display = 'inline-block';

  // TODO: These should be configurable.
  el.style.height = '24px';
  el.style.width = '150px';
}

function setRunnerStyles(el) {
  el.style.position = 'absolute';
}

function setTurtleStyles(el) {
  el.style.position = 'absolute';
}

module.exports = Seekbar;
