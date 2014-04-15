//test app activity function
var cacheClient = require("../cacheclient").cacheClient;

$fh = {};
$fh.cache = function(params, cb){
  var key = params.key;
  if(params.act === "save"){
    cacheClient.set(key, params.value, function(err, reply){
      return cb(err, reply);
    });
  } else if(params.act === "load"){
    cacheClient.get(key, function(err, reply){
      return cb(err, reply);
    });
  }
};

var recordActivity = require("../record_activity").recordActivity;
var listActivity = require("../record_activity").listActivity;
var setCacheKey = require("../record_activity").setCacheKey;

exports.dependencies = ['cache'];

var testCacheKey = "test_activity_cache_key";

exports.setUp = function(test){
  setCacheKey(testCacheKey);
  cacheClient.del(testCacheKey, function(err, reply){
    test.finish();
  });
};

exports.tearDown = function(test){
  cacheClient.del(testCacheKey, function(err, reply){
    cacheClient.end();
    test.finish();
  });
};

exports.testActivity = function(test, assert){
  listActivity({}, function(err, res){
    assert.isNull(err);
    assert.isNull(res.activity);
    recordActivity({action: "test1"}, function(err, res){
      assert.isNull(err);
      assert.match(res.status, /ok/i);
      listActivity({}, function(err, res){
        assert.isNull(err);
        assert.equal(1, res.activity.length);
        recordActivity({action: "test2"}, function(err, res){
          assert.isNull(err);
          assert.match(res.status, /ok/i);
          listActivity({}, function(err, res){
            assert.isNull(err);
            assert.equal(2, res.activity.length);
            assert.match(res.activity[0].action, /test1/i);
            assert.match(res.activity[1].action, /test2/i);
            test.finish();
          });
        });
      });
    });
  });
};