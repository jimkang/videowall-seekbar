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

  t.end();
});

// test('Seeking', function seekingTest(t) {
//   t.plan(1);

//   function somethign() {
//     t.ok();
//   }

//   setTimeout(something, 0);
// }
