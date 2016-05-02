var util = require('util');
var events = require('events');

function Message(){
  events.EventEmitter.call(this)
}
