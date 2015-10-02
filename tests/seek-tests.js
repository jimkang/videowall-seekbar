var test = require('tape');
var Seekbar = require('../index');
var insertTestStyles = require('./fixtures/insert-test-styles');
var moveMouseOnEl = require('./fixtures/move-mouse-on-el');
var simulant = require('simulant');
var MockMediaElement = require('./fixtures/mock-media-element');

test('Seeking', function seekingTest(t) {
  t.plan(3);

  var seekbar = Seekbar({
    theWindow: window,
    mediaElements: [MockMediaElement(), MockMediaElement()],
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000px'
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();
  var runnerEl = seekbar.getRunnerEl();

  document.body.appendChild(el);

  function* moveSequence(x, y, checkFn) {
    simulant.fire(turtleEl, 'mousedown');
    yield;
    moveMouseOnEl(turtleEl, x, y);
    yield;
    simulant.fire(turtleEl, 'mouseup');
    yield;
    checkFn();
  }

  var iterA = moveSequence(100, 0, checkMoveA);
  var iterB = moveSequence(200, 0, checkMoveB);
  var iterC = moveSequence(40, 0, checkMoveC);

  // TODO: Make into loop.
  setTimeout(iterA.next.bind(iterA), 0);
  setTimeout(iterA.next.bind(iterA), 100);
  setTimeout(iterA.next.bind(iterA), 300);
  setTimeout(iterA.next.bind(iterA), 301);
  setTimeout(iterB.next.bind(iterB), 400);
  setTimeout(iterB.next.bind(iterB), 500);
  setTimeout(iterB.next.bind(iterB), 700);
  setTimeout(iterB.next.bind(iterB), 701);
  setTimeout(iterC.next.bind(iterC), 800);
  setTimeout(iterC.next.bind(iterC), 900);
  setTimeout(iterC.next.bind(iterC), 1100);
  setTimeout(iterC.next.bind(iterC), 1101);

  function checkMoveA() {
    t.equal(turtleEl.style.left, '100px', 'Turtle position is correct.');
  }

  function checkMoveB() {
    t.ok('B');
  }

  function checkMoveC() {
    t.ok('C');
  }
});
