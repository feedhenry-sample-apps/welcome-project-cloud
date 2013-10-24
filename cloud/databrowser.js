var MongoClient = require('mongodb').MongoClient;
var dbConn;

//setup mongo db
exports.connectDB = function(dbUrl, cb){
  if(null == dbConn){
    console.log('dbUrl = ' + dbUrl);
    MongoClient.connect(dbUrl, function(err, db){
      if(err){
        console.log("Failed to connect to MongoDB", err);
        dbConn = null;
        return cb(err, null);
      }
      dbConn = db;
      console.log("Db connection established");
      return cb(null, dbConn);
    });
  } else {
    return cb(null, dbConn);
  }
};

//save the data into the db
exports.saveData = function(params, callback){
  if(dbConn == null){
    return callback("DB connection error");
  }
  var collection = params.collection;
  var doc = params.document;
  doc.created = new Date().getTime();
  var collection = dbConn.collection(collection);
  collection.insert(doc, function(err, docs){
    if(err){
      console.log('Failed to create data', err);
      return callback('Data creation error.');
    }
    return callback(null, {'status': 'ok'});
  });
};