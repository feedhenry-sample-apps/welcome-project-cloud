//test getWeather function, use mock service
var getWeather = require('weather.js').getWeather;
var setWeatherProvider = require('weather.js').setWeatherProvider;
var getCacheClient = require("weather.js").getCacheClient;
var getCacheKey = require("weather.js").getCacheKey;

var SERVICE_PROVIDER = "http://127.0.0.1:9006";

exports.dependencies = ['cache', 'weather'];

exports.testGetWeather = function(test, assert){
  setWeatherProvider(SERVICE_PROVIDER);
  var lat = 0;
  var lon = 0;
  var cacheKey = getCacheKey(lat, lon);
  console.log("test cache key is ", cacheKey);
  var cacheClient = getCacheClient();
  cacheClient.del(cacheKey, function(){
    var params = {lat: lat, lon: lon};
    getWeather(params, function(err, res){
      assert.isNull(err);
      assert.equal(6, res.data.length);
      cacheClient.get(cacheKey, function(err, cached){
        assert.isNull(err);
        assert.isDefined(cached);
        cacheClient.end();
        test.finish();
      });
    });
  });
};