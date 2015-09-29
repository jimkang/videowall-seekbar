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

  var seekbarEl = doc.createElement('div');

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

  console.log('Hi, Firefox!');
  var div = doc.createElement('div');
  div.innerText = 'Hello';
  doc.body.appendChild(div);

  return {
    getValue: getValue,
    el: el
  };
}

module.exports = Seekbar;
