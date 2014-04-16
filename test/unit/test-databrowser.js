//test databrowser function
var db = require('lib/databrowser.js');
var saveData = db.saveData;
var connectDB = db.connectDB;
var assert = require('assert');
var util = require('util');
var dbConn;
var dbUrl = "mongodb://127.0.0.1:27017/integrationtest";
var COLLECTION = "testOnly";

exports.testDataBrowser = function(finish){
  connectDB(dbUrl, function(err, db){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    var collection = db.collection(COLLECTION);
    assert.ok(collection, 'collection is not found');
    collection.remove({}, function(err, removed){
      assert.ok(!err, 'Unexpected error: ', util.inspect(err));
      saveData({collection: COLLECTION, document: {name: 'test'}}, function(err, res){
        assert.ok(!err, 'Unexpected error: ', util.inspect(err));
        collection.count({name: 'test'}, function(err, count){
          assert.ok(!err, 'Unexpected error: ', util.inspect(err));
          assert.equal(1, count, 'collection count = ' + count);
          console.log("collection count = " + count);
          db.close(); //Important to close the connection otherwise the test will timeout!!
          finish();
        });
      });
    });
  });
};
