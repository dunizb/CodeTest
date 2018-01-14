var Subject = function(){
    var _observers = [];

    this.attach = function(observer){
        _observers.push(observer);
    }

    this.detach = function(){
        _observers.pop();
    }

    this.notify = function(msg){
        for(var i = 0; i < _observers.length; i++){
            _observers[i].update(msg);
        }
    }

    this.print = function(){
        console.log(_observers.length);
        console.log(_observers);
    }
}

var Observer = function(name){
    this.update = function(msg){
        console.log('I am ', name, 'and I get the message ', msg);
    }
}

var sub = new Subject();
sub.attach(new Observer('a'));
sub.attach(new Observer('b'));
sub.notify('hello');

console.log('');

setTimeout(function(){
    sub.detach();
    sub.attach(new Observer('c'));
    sub.notify('world');
}, 1000);