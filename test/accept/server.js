var express = require('express');
var mbaasApi = require('fh-mbaas-api');
var mbaasExpress = mbaasApi.mbaasExpress();

var app = express();
app.use('/sys', mbaasExpress.sys([]));
app.use('/mbaasExpress', mbaasExpress.mbaas);
app.use('/cloud', require('lib/cloud.js')());

app.use('/', function(req, res){
  res.end('Your Cloud App is Running');
});

app.use(mbaasExpress.errorHandler());

var server;

exports.setUp = function(finish){
  var port = 8052;
  server = app.listen(port, function(){
    console.log("App started at: " + new Date() + " on port: " + port);
    finish();
  });
};

exports.tearDown = function(finish) {
  if (server) {
    server.close(function() {
      // close down database connection
      var dbConn = require('lib/databrowser.js').getDbConn()
      if (dbConn) dbConn.close();

      // close down redis connection
      var cc = require('lib/cacheclient.js').cacheClient;
      if (cc) cc.quit();
      finish();
    });
  }
};
