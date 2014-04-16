//test app activity function
var cc = require("lib/cacheclient.js");
var cacheClient = cc.cacheClient;
var assert = require('assert');
var util = require('util');

var fh = {
  cache : function(params, cb){
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
  }
};

var record = require("lib/record_activity.js");
var recordActivity = record.recordActivity;
var listActivity = record.listActivity;
var setCacheKey = record.setCacheKey;

var testCacheKey = "test_activity_cache_key";

exports.setUp = function(finish){
  setCacheKey(testCacheKey);
  cacheClient.del(testCacheKey, function(err, reply){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    finish();
  });
};

exports.tearDown = function(finish){
  cacheClient.del(testCacheKey, function(err, reply){
    cacheClient.quit();
    finish();
  });
};

exports.testActivity = function(finish){
  listActivity({}, function(err, res){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    recordActivity({action: "test1"}, function(err, res){
      assert.ok(!err, 'Unexpected error: ', util.inspect(err));
      listActivity({}, function(err, res){
        assert.ok(!err, 'Unexpected error: ', util.inspect(err));
        recordActivity({action: "test2"}, function(err, res){
          assert.ok(!err, 'Unexpected error: ', util.inspect(err));
          listActivity({}, function(err, res){
            assert.ok(!err, 'Unexpected error: ', util.inspect(err));
            finish();
          });
        });
      });
    });
  });
};