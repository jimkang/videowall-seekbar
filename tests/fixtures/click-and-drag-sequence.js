var moveMouseOnEl = require('./move-mouse-on-el');
var simulant = require('simulant');

function createClickAndDragSequence(seekbarEl, turtleEl) {
  function* moveSequence(opts, done) {
    var {
      x,
      y
    } = opts;

    simulant.fire(turtleEl, 'mousedown');
    yield;

    moveMouseOnEl(seekbarEl, x, y);
    yield;

    simulant.fire(window, 'mouseup');
    yield;

    // This one shouldn't affect anything.
    moveMouseOnEl(seekbarEl, x + 200, y);
    yield;
    
    if (done) {
      done();
    }
  }
  return moveSequence;
}

module.exports = createClickAndDragSequence;
