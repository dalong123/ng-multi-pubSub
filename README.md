# ng-multi-pubSub
================

Angular version of multi channel for pubSub.

This library introduces the `PubSub` able to create several pub-sub channels based on an index (string).

```javascript
angular.module('test', ['ng-PubSub']).controller('myController', function ($log, NgPubSub) {
    var channel1 = NgPubSub('channel-1'); //create a new channel
    var channel2 = NgPubSub('channel-2'); //create a new channel
    
    // NgPubSub('channel-1') will not create a new channel
    // It will return the same channel defined in channel1 variable
    
    // Function called when there is an `evt` event on channel1 channel
    var evtManager1 = channel1.on('evt', function (evt, param) {
        $log.log('normal', param);
    });
    
    // Nothing happens for the event `evt` is executed on channel2
    channel2.publish('evt', new Date().getDate());
    
    // The function with `$log.log` command is called for it's on a
    // listenere on `evt` event on channel 1
    channel1.publish('evt', new Date().getDate());
    
    // Switch the event off.
    channel1.off(evtManager1);
    
    // Nothing will happens for the event was cleaned before.
    channel1.publish('evt', new Date().getDate());
});
```
