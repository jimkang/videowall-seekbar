var test = require('tape');
var Seekbar = require('../index');
var MockMediaElement = require('./fixtures/mock-media-element');
var simulant = require('simulant');

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
  t.throws(
    constructWithoutMediaElements,
    'Constructor throws if no media elements are provided.'
  );

  var seekbar = Seekbar({
    doc: window.document,
    mediaElements: [MockMediaElement(), MockMediaElement()],
    width: '150px'
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

test('Seeking', function seekingTest(t) {
  var seekbar = Seekbar({
    doc: window.document,
    mediaElements: [MockMediaElement(), MockMediaElement()]    
  });

  var el = seekbar.el();
  var turtleEl = seekbar.getTurtleEl();
  var runnerEl = seekbar.getRunnerEl();

  document.body.appendChild(el);

  var mousedown = simulant('mousedown');
  simulant.fire(turtleEl, 'mousedown');

  t.end();
});

function insertTestStyles(doc) {
  var style = doc.createElement('style');

  style.textContent = `.videowall-seekbar {
    height: 60px;
  }

  .videowall-seekbar-runner {
    background-color: gray;
    height: 100%;
  }

  .videowall-seekbar-turtle {
    background-color: green;
    width: 44px;
    height: 100%;
  }
  `;
  doc.body.appendChild(style);
}
