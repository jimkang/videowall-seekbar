var simulant = require('simulant');

function moveMouseOnEl(el, x, y) {
  simulant.fire(
    window,
    'mousemove',
    {
      relatedTarget: el,
      clientX: x,
      clientY: y
    }
  );
}

module.exports = moveMouseOnEl;
