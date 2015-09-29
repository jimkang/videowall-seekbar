var test = require('tape');
var Seekbar = require('../index');
var MockMediaElement = require('./fixtures/mock-media-element');

test('Construction', function ctorTest(t) {
  function constructWithoutMediaElements() {
    var seekbar = Seekbar({
      min: 0,
      max: 100,
      initValue: 0
    });
  }

  t.throws(Seekbar, 'Constructor throws if no opts are given.');
  t.throws(
    constructWithoutMediaElements,
    'Constructor throws if no media elements are provided.'
  );

  var seekbar = Seekbar({
    doc: window.document,
    mediaElements: [MockMediaElement(), MockMediaElement()]    
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

  // document.body.appendChild(el);

  var runnerEl = el.querySelector('.videowall-seekbar-runner');
  t.ok(runnerEl, 'Seekbar element has a runner child.');
  t.equal(runnerEl.style.position, 'absolute', 'Runner position style is set.');

  var turtleEl = el.querySelector('.videowall-seekbar-turtle');
  t.ok(turtleEl, 'Seekbar element has a turtle child.');
  t.equal(turtleEl.style.position, 'absolute', 'Turtle position style is set.');

  t.end();
});

// test('Seeking', function seekingTest(t) {
//   var seekbar = Seekbar({
//     doc: window.document,
//     mediaElements: [MockMediaElement(), MockMediaElement()]    
//   });

//   var el = seekbar.el();

//   t.end();
// });
