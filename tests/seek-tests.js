var test = require('tape');
var Seekbar = require('../index');
var insertTestStyles = require('./fixtures/insert-test-styles');
var moveMouseOnEl = require('./fixtures/move-mouse-on-el');
var simulant = require('simulant');
var MockMediaElement = require('./fixtures/mock-media-element');
var queue = require('queue-async');

// test('Pause', function pauseHack(t) {
//   window.cont = t.end;
//   // Call `cont()` in the browser console when you're ready to continue.
// });

test('Seeking', function seekingTest(t) {
  insertTestStyles(window.document);

  t.plan(6);

  var seekbar = Seekbar({
    theWindow: window,
    mediaElements: [MockMediaElement(), MockMediaElement()],
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000',
    unit: 'px'
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();
  var runnerEl = seekbar.getRunnerEl();

  document.body.appendChild(el);

  function* moveSequence(x, y, checkFn) {
    simulant.fire(turtleEl, 'mousedown');
    yield;

    moveMouseOnEl(el, x, y);
    yield;

    simulant.fire(turtleEl, 'mouseup');
    yield;
    
    checkFn();
  }

  var iterA = moveSequence(100, 0, checkMoveA);
  var iterB = moveSequence(200, 0, checkMoveB);
  var iterC = moveSequence(40, 0, checkMoveC);

  var q = queue(1);
  q.defer(runUntilDone, iterA.next.bind(iterA));
  q.defer(runUntilDone, iterB.next.bind(iterB));
  q.defer(runUntilDone, iterC.next.bind(iterC));
  q.awaitAll(iteratorsDone);

  function iteratorsDone(error) {
    if (error) {
      console.log(error);
    }
  }

  function runUntilDone(iteratorNext, runDone) {
    function runNext() {
      if (iteratorNext().done) {
        setTimeout(runDone, 50);
      }
      else {
        setTimeout(runNext, 50);
      }
    }
    runNext();
  }

  function checkMoveA() {
    t.equal(turtleEl.style.left, '100px', 'Turtle position is correct.');
    t.equal(seekbar.getValue(), 10, 'Value is correct.');
  }

  function checkMoveB() {
    t.equal(turtleEl.style.left, '200px', 'Turtle position is correct.');
    t.equal(seekbar.getValue(), 20, 'Value is correct.');
  }

  function checkMoveC() {
    t.equal(turtleEl.style.left, '40px', 'Turtle position is correct.');
    t.equal(seekbar.getValue(), 4, 'Value is correct.');
  }  
});

test('Setting', function settingTest(t) {
  var seekbar = Seekbar({
    theWindow: window,
    mediaElements: [MockMediaElement(), MockMediaElement()],
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000',
    unit: 'px'
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();

  document.body.appendChild(el);

  seekbar.setValue(99.1);
  t.equal(turtleEl.style.left, '991px', 'Turtle position is correct.');
  t.equal(seekbar.getValue(), 99.1, 'Value is correct.');

  seekbar.setValue(125);
  t.equal(turtleEl.style.left, '1000px', 'Turtle position is correct.');
  t.equal(seekbar.getValue(), 100, 'Value is correct.');

  seekbar.setValue(0);
  t.equal(turtleEl.style.left, '0px', 'Turtle position is correct.');
  t.equal(seekbar.getValue(), 0, 'Value is correct.');

  seekbar.setValue(-12);
  t.equal(turtleEl.style.left, '0px', 'Turtle position is correct.');
  t.equal(seekbar.getValue(), 0, 'Value is correct.');

  seekbar.setValue(55.8);
  t.equal(turtleEl.style.left, '558px', 'Turtle position is correct.');
  t.equal(seekbar.getValue(), 55.8, 'Value is correct.');

  t.end();
});
