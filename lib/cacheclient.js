//initialize redis cache client
var redis = require('redis');
var port = 6379;
var host = '127.0.0.1';
if(process.env && process.env.FH_REDIS_PORT){
  port = parseInt(process.env.FH_REDIS_PORT, 10);
}
if(process.env && process.env.FH_REDIS_HOST){
  host = process.env.FH_REDIS_HOST;
}

var cacheClient = redis.createClient(port, host, {});
if(process.env && process.env.FH_REDIS_PASSWORD && process.env.FH_REDIS_PASSWORD.length > 0){
  cacheClient.auth(process.env.FH_REDIS_PASSWORD);
}
cacheClient.on('ready', function(){
  console.log("Cache Client is Ready");
});
cacheClient.on('error', function(error){
  console.log("Failed to connect cache", error);
  cacheClient.end();
  cacheClient = undefined;
});

exports.cacheClient = cacheClient;