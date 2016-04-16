angular.module('ng-PubSub', [
]).service('NgPubSub', ['$rootScope', function ($rootScope) {
    'use strict';

    var PubSubList = {};
    function EvtManager (clearFn) {
      var deleted = false;

      this.clear = function () {
        if (deleted) {
          return false;
        }
        clearFn();
        deleted = true;
        return true;
      };

      this.isActive = function () {
        return !deleted;
      };
    }

    function PubSub (PubSubKey) {
      var scope = $rootScope.$new();

      this.key = PubSubKey;
      this.publish = scope.$emit.bind(scope);

      this.on = function (evtName, callback) {
        var eraser = scope.$on(evtName, callback);
        return new EvtManager(eraser);
      }
      this.once = function (evtName, callback) {
        var eraser = scope.$on(evtName, function () {
          var params = [].slice.call(arguments);
          callback.apply(this, params);
          eraser();
        });
        return new EvtManager(eraser);
      };

      this.off = function (evtManager) {
        if (evtManager.constructor !== EvtManager) {
          throw new Error('Invalid param: the param must be an EventManager');
        }
        return evtManager.clear();
      };

    }

    function getPubSub (PubSubKey) {
      PubSubList[PubSubKey] || (PubSubList[PubSubKey] = new PubSub(PubSubKey));
      return PubSubList[PubSubKey];
    }

    return getPubSub;
}]);
