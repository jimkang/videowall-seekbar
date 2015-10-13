var test = require('tape');
var Seekbar = require('../index');
var insertTestStyles = require('./fixtures/insert-test-styles');
var queue = require('queue-async');
var createClickAndDragSequence = require('./fixtures/click-and-drag-sequence');
var runIteratorUntilDone = require('./fixtures/run-iterator-until-done');
var callNextTick = require('call-next-tick');

var defaultTurtleOffset = -22;

// test('Pause', function pauseHack(t) {
//   window.cont = t.end;
//   // Call `cont()` in the browser console when you're ready to continue.
// });


test('Seeking', function seekingTest(t) {
  insertTestStyles(window.document);

  t.plan(9);

  var seekbar = Seekbar({
    theWindow: window,
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000',
    unit: 'px',
    onValueChange: checkValueChange
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();

  document.body.appendChild(el);

  var runClickAndDrag = createClickAndDragSequence(el, turtleEl);

  var iterA = runClickAndDrag(
    {
      x: 100,
      y: 0
    },
    checkMoveA
  );
  var iterB = runClickAndDrag(
    {
      x: 200,
      y: 0
    },
    checkMoveB
  );
  var iterC = runClickAndDrag(
    {
      x: 40,
      y: 0
    },
    checkMoveC
  );

  var q = queue(1);
  q.defer(runIteratorUntilDone, iterA.next.bind(iterA), 50);
  q.defer(runIteratorUntilDone, iterB.next.bind(iterB), 50);
  q.defer(runIteratorUntilDone, iterC.next.bind(iterC), 50);
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

  var expectedValues = [10, 20, 4];

  function checkMoveA() {
    t.equal(
      turtleEl.style.left,
      100 + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), expectedValues[0], 'Value is correct.');
  }

  function checkMoveB() {
    t.equal(
      turtleEl.style.left,
      200 + defaultTurtleOffset + 'px', 'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), expectedValues[1], 'Value is correct.');
  }

  function checkMoveC() {
    t.equal(
      turtleEl.style.left, 40 + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), expectedValues[2], 'Value is correct.');
  }

  var changeCount = 0;

  function checkValueChange(value) {
    t.equal(
      value,
      expectedValues[changeCount],
      'onValueChange called with correct value.'
    );
    changeCount += 1;
  }
});

test('Setting', function settingTest(t) {
  var seekbar = Seekbar({
    theWindow: window,
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
  setTimeout(checkSetA, 100);

  function checkSetA() {
    t.equal(
      turtleEl.style.left,
      991 + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), 99.1, 'Value is correct.');

    seekbar.setValue(125);
    setTimeout(checkSetB, 100);
  }

  function checkSetB() {
    t.equal(
      turtleEl.style.left,
      1000 + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), 100, 'Value is correct.');

    seekbar.setValue(0);
    setTimeout(checkSetC, 100);
  }

  function checkSetC() {
    t.equal(
      turtleEl.style.left,
      0 + defaultTurtleOffset + 'px', 'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), 0, 'Value is correct.');

    seekbar.setValue(-12);
    setTimeout(checkSetD, 100);
  }

  function checkSetD() {
    t.equal(
      turtleEl.style.left,
      0  + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), 0, 'Value is correct.');

    seekbar.setValue(55.8);
    setTimeout(checkSetE, 100);
  }

  function checkSetE() {    
    t.equal(
      turtleEl.style.left,
      558 + defaultTurtleOffset + 'px',
      'Turtle position is correct.'
    );
    t.equal(seekbar.getValue(), 55.8, 'Value is correct.');

    t.end();
  }
});

test('Set-and-notify cycle', function cycleTest(t) {
  t.plan(2 * 100);

  var seekbar = Seekbar({
    theWindow: window,
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000',
    unit: 'px',
    onValueChange: respondToValueChange
  });

  document.body.appendChild(seekbar.el());

  var readjustCount = 0;
  var expectedValue = 1;
  var expectedOrigin = 'test-set-' + expectedValue;
  seekbar.setValue(1, expectedOrigin);

  function respondToValueChange(newValue, originData) {
    t.equal(newValue, expectedValue, 'onValueChange passes correct value.');
    t.equal(originData, expectedOrigin, 'onValueChange passes originData');
    expectedValue = newValue + 1;
    expectedOrigin = 'test-set-' + expectedValue;

    readjustCount += 1;
    if (readjustCount < 100) {
      seekbar.setValue(newValue + 1, expectedOrigin);
    }
  }
});

test('UI-triggered value change', function uiTriggeredValueChange(t) {
  t.plan(2 * 3);

  var seekbar = Seekbar({
    theWindow: window,
    min: 0,
    max: 100,
    initValue: 0,
    width: '1000',
    unit: 'px',
    onValueChange: respondToValueChange
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();  

  document.body.appendChild(el);

  var runClickAndDrag = createClickAndDragSequence(el, turtleEl);

  var iterA = runClickAndDrag(
    {
      x: 140,
      y: 0
    }
  );
  var iterB = runClickAndDrag(
    {
      x: 800,
      y: 0
    }
  );
  var iterC = runClickAndDrag(
    {
      x: 20,
      y: 0
    }
  );

  function moveOn() {
    callNextTick(done);
  }

  var expectedOrigin = {
    sourceType: 'UI'
  };

  var adjustCount = 0;

  var q = queue(1);  
  q.defer(runIteratorUntilDone, iterA.next.bind(iterA), 50);
  q.defer(runIteratorUntilDone, iterB.next.bind(iterB), 50);
  q.defer(runIteratorUntilDone, iterC.next.bind(iterC), 50);
  q.awaitAll(iteratorsDone);

  function iteratorsDone(error) {
    if (error) {
      console.log(error);
    }
  }

  function respondToValueChange(newValue, originData) {
    var newValue = Math.round(newValue);
    
    switch (adjustCount) {
      case 0:
        t.equal(newValue, 14, 'onValueChange is given correct value.');
        t.deepEqual(
          originData,
          expectedOrigin,
          'onValueChange originData indicates UI source.'
        );
        break;
      case 1:
        t.equal(newValue, 80, 'onValueChange is given correct value.');
        t.deepEqual(
          originData,
          expectedOrigin,
          'onValueChange originData indicates UI source.'
        );
        break;
      case 2:
        t.equal(newValue, 2, 'onValueChange is given correct value.');
        t.deepEqual(
          originData,
          expectedOrigin,
          'onValueChange originData indicates UI source.'
        );
        break;
    }
    
    adjustCount += 1;
  }
});
