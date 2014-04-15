//test databrowser function
var saveData = require('../databrowser').saveData;
var connectDB = require('../databrowser').connectDB;

var dbConn;
var dbUrl = "mongodb://127.0.0.1:27017/integrationtest";
var COLLECTION = "testOnly";

exports.dependencies = ['db'];

exports.testDataBrowser = function(test, assert){
  connectDB(dbUrl, function(err, db){
    assert.isNull(err, 'db error');
    assert.isDefined(db, 'db is not defined');
    var collection = db.collection(COLLECTION);
    assert.isDefined(collection, 'collection is not found');
    collection.remove({}, function(err, removed){
      assert.isNull(err, 'collection remove error');
      saveData({collection: COLLECTION, document: {name: 'test'}}, function(err, res){
        assert.isNull(err, 'saveData error');
        assert.match(res.status, /ok/i, "saveData res is not ok");
        collection.count({name: 'test'}, function(err, count){
          assert.isNull(err, 'collection count error');
          assert.equal(1, count, 'collection count = ' + count);
          console.log("collection count = " + count);
          db.close(); //Important to close the connection otherwise the test will timeout!!
          test.finish();
        });
      });
    });
  });
};

