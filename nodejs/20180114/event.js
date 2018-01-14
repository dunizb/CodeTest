var EventEmitter = require('events').EventEmitter;
var eventObj = new EventEmitter();

eventObj.on('done', function(id){
  console.log('event done with id', id);
});

console.log('begin...');

setTimeout(function(){
  eventObj.emit('done', 1);
}, 1000);

eventObj.emit('done', 2);

console.log('end...');
