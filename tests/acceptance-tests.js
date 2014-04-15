//acceptance tests
var request = require("request");

exports.dependencies = ['acceptance'];

var baseUrl = "http://127.0.0.1:8002/cloud/";

exports.testCloudCall = function(test, assert){
  request({url: baseUrl + "hello", method: 'POST', json: true}, function(err, response, body){
    console.log("body", body);
    assert.isNull(err);
    assert.match(body.text, /hello from feedhenry/i);
    test.finish();
  });
};

exports.testGetWeather = function(test, assert){
  request({url: baseUrl + "getWeather", method: 'POST', json: {"lat":52.251,"lon":-7.153}}, function(err, response, body){
    assert.isNull(err);
    assert.equal(200, response.statusCode);
    assert.isDefined(body.data);
    test.finish();
  });
};

exports.testSaveData = function(test, assert){
  request({url: baseUrl + "saveData", method: 'POST', json: {"collection": "test", "document": "test"}}, function(err, response, body){
    assert.isNull(err);
    assert.equal(200, response.statusCode);
    test.finish();
  });
};

