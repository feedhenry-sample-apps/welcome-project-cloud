var MongoClient = require('mongodb').MongoClient;
var fh = require('fh-mbaas-api');
var dbConn;

/*
If this app has a direct MongoDB connection string (enabed from data browser UI in App Studio
then the FH_MONGODB_CONN_URL environment variable will be set. This tells us whether we can
connect to mongo directly or if we should use fh.db for database actions
 */
var hasDbConnUrl = (process.env.FH_MONGODB_CONN_URL != null);


//save the data into the db
exports.save = function(params, callback) {
  console.log(new Date() + ' - starting database save');
  if (hasDbConnUrl) {
    doDirectSave(parmas, saveCb)
  } else {
    doFhDbSave(params, saveCb);
  }

  var saveCb = function(err, res) {
    console.log(new Date() + ' - finished database save');
    if( err ) {
      console.log('ERROR :: ', err);
    }
    callback(err, res);
  }
}

// Helper methif for savinf using MongoDB driver
var doDirectSave = function(params, cb) {
  connectDB(function(err, conn) {
    if(err) cb(err);

    var collection = params.collection;
    var doc = params.document;
    doc.created = new Date().getTime();
    var collection = dbConn.collection(collection);
    collection.insert(doc, function(err, docs){
      if(err){
        console.log(new Date() + ' - Failed to create data via direct MongoDB driver', err);
        return cb('Data creation error - ', err);
      }
      return callback(null, {'status': 'ok'});
    });
  });
};

// Helper function for saving using FeedHenry fh.db API
var doFhDbSave = function(params, cb) {
  var collection = params.collection;
  var doc = params.document;
  doc.created = new Date().getTime();

  var options = {
    "act": "create",
    "type": collection,
    "fields": doc
  };
  fh.db(options, function (err, data) {
    if(err) {
      console.log(new Date() + ' - Failed to create data via fh.db - ', err);
      return cb('Data creation error - ', err);
    }
    return callback(null, {'status': 'ok'});
  });
};

//setup direct mongo db connection
var connectDB = function(cb){
  if(null == dbConn){
    var dbUrl = process.env.FH_MONGODB_CONN_URL;
    console.log(new Date() + ' - dbUrl = ' + dbUrl);
    MongoClient.connect(dbUrl, function(err, db){
      if(err){
        console.log(new Date() + " - Failed to connect to MongoDB - ", err);
        dbConn = null;
        return cb(err, null);
      }
      dbConn = db;
      console.log(new Date() + " - Db connection established");
      return cb(null, dbConn);
    });
  } else {
    return cb(null, dbConn);
  }
};
