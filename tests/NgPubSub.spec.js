// if (!Function.prototype.bind) {
//   Function.prototype.bind = function () {

//     if (typeof this !== 'function' || typeof this.apply !== 'function') {
//       throw new TypeError("Function.prototype.bind - just for functions");
//     }

//     var baseArguments = [].slice.call(arguments, 1),
//       context = arguments[0],
//       fn = this;

//     return function () {
//       var extraArguments = [].slice.call(arguments);
//       fn.apply(context, baseArguments.concat(extraArguments));
//     };
//   };
// }

describe('NgPubSub service', function () {
  'use strict';

  var NgPubSub;

  beforeEach(function () {
    module('ng-PubSub');
    inject(function (_NgPubSub_) {
      NgPubSub = _NgPubSub_;
    });
  });

  it('should return the same object if we send the same key', function () {
    var pubSub1 = NgPubSub('test1');
    var pubSub2 = NgPubSub('test1');

    expect(pubSub1).toBe(pubSub2);
  });

  it('should return the different objects if we send different keys', function () {
    var pubSub1 = NgPubSub('test1');
    var pubSub2 = NgPubSub('test2');

    expect(pubSub1).not.toBe(pubSub2);
  });

  it('should call just the pre-derined function', function () {
    var fnGroup = {
      toCall: angular.noop,
      toNotCall: angular.noop
    };
    
    spyOn(fnGroup, 'toNotCall');

    var pubSub1 = NgPubSub('test');
    spyOn(fnGroup, 'toCall');
    pubSub1.on('evtTest1', fnGroup.toCall);
    pubSub1.on('evtTest2', fnGroup.toNotCall);
    
    pubSub1.publish('evtTest1');

    expect(fnGroup.toCall).toHaveBeenCalled();
    expect(fnGroup.toNotCall).not.toHaveBeenCalled();
  });

  it('should call the callback just once', function () {
    var pubSub1 = NgPubSub('test'),
      counter = 0;

    pubSub1.once('evtTest', function () {
      counter++;
    });
    
    pubSub1.publish('evtTest');
    pubSub1.publish('evtTest');
    pubSub1.publish('evtTest');
    pubSub1.publish('evtTest');

    expect(counter).toBe(1);
    
  });

  it('should call the callback every single publish', function () {
    var pubSub1 = NgPubSub('test'),
      numberOfBinding = 10,
      counter = 0,
      cont;

    pubSub1.on('evtTest', function () {
      counter++;
    });

    for (cont = 0; cont < numberOfBinding; cont++) {
      pubSub1.publish('evtTest');
    }

    expect(counter).toBe(numberOfBinding);
  });

  it('should call just the callback related to the pubsub', function () {
    var fnGroup = {
      toCall: angular.noop,
      toNotCall: angular.noop
    };
    var pubSub1 = NgPubSub('test1');
    var pubSub2 = NgPubSub('test2');

    spyOn(fnGroup, 'toCall');
    spyOn(fnGroup, 'toNotCall');

    pubSub1.on('evt', fnGroup.toCall);
    pubSub2.on('evt', fnGroup.toNotCall);

    pubSub1.publish('evt');

    expect(fnGroup.toCall).toHaveBeenCalled();
    expect(fnGroup.toNotCall).not.toHaveBeenCalled();
  });
});