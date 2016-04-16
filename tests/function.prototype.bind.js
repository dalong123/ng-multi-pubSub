if (!Function.prototype.bind) {
  Function.prototype.bind = function () {

    if (typeof this !== 'function' || typeof this.apply !== 'function') {
      throw new TypeError("Function.prototype.bind - just for functions");
    }

    var baseArguments = [].slice.call(arguments, 1),
      context = arguments[0],
      fn = this;

    return function () {
      var extraArguments = [].slice.call(arguments);
      fn.apply(context, baseArguments.concat(extraArguments));
    };
  };
}