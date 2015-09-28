var test = require('tape');
var Seekbar = require('../index');
// var jsdom = require('jsdom');

test('Basic test', function basicTest(t) {
  var seekbar = Seekbar();  
  t.ok(seekbar, 'Test description.');
  t.end();
});
