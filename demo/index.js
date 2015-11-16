var Seekbar = require('../index');

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

function respondToValueChange(newValue, originData) {
  console.log(newValue);
}
