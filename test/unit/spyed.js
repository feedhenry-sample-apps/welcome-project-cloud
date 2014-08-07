exports.myFunc = function(params, cb) {
  console.log('in myfunc - params = ', params);
  return this.foooo(params, cb);
  //return cb();
}

var myOtherFunc = function(params, cb) {

//exports.myOtherFunc = myOtherFunc = function(params, cb) {
  console.log('in myotherfunc - params = ', params);
  return cb();
}

exports.foooo = myOtherFunc;