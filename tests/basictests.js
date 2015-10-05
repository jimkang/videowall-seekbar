var test = require('tape');
var Seekbar = require('../index');
var insertTestStyles = require('./fixtures/insert-test-styles');

test('Construction', function ctorTest(t) {
  insertTestStyles(window.document);

  function constructWithoutMediaElements() {
    var seekbar = Seekbar({
      min: 0,
      max: 100,
      initValue: 0,
      width: 150
    });
  }

  t.throws(Seekbar, 'Constructor throws if no opts are given.');

  var seekbar = Seekbar({
    theWindow: window,
    mediaElements: [MockMediaElement(), MockMediaElement()],
    width: 150,
    unit: 'px'
  });

  t.equal(typeof seekbar, 'object', 'Creates a seekbar instance.');
  t.equal(seekbar.getValue(), 0, 'Seekbar has a default value of 0.');

  var el = seekbar.el();
  t.equal(typeof el, 'object', 'Seekbar has a DOM element.');
  t.ok(
    el.classList.contains('videowall-seekbar'), 'Seekbar element class is set.'
  );
  t.equal(el.style.position, 'relative', 'Seekbar position style is set.');
  t.equal(el.style.display, 'inline-block', 'Seekbar display style is set.');
  t.equal(el.style.width, '150px', 'Seekbar width is correct.');

  var runnerEl = el.querySelector('.videowall-seekbar-runner');
  t.ok(runnerEl, 'Seekbar element has a runner child.');
  t.equal(runnerEl.style.position, 'absolute', 'Runner position style is set.');
  t.equal(runnerEl.style.width, '100%', 'Runner width is correct.');

  var turtleEl = el.querySelector('.videowall-seekbar-turtle');
  t.ok(turtleEl, 'Seekbar element has a turtle child.');
  t.equal(turtleEl.style.position, 'absolute', 'Turtle position style is set.');

  t.end();
});
