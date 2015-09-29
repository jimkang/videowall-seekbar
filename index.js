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

  function el() {
    return seekbarEl;
  }

  var div = doc.createElement('div');
  div.textContent = 'Hello';
  doc.body.appendChild(div);

  return {
    getValue: getValue,
    el: el
  };
}

function createDOMElements(doc) {
  var seekbarEl = doc.createElement('div');
  seekbarEl.classList.add('videowall-seekbar');
  var runnerEl = doc.createElement('div');
  runnerEl.classList.add('videowall-seekbar-runner');
  var turtleEl = doc.createElement('div');
  turtleEl.classList.add('videowall-seekbar-turtle');

  seekbarEl.appendChild(runnerEl);
  seekbarEl.appendChild(turtleEl);

  return {
    seekbarEl,
    runnerEl,
    turtleEl
  };
}

module.exports = Seekbar;
