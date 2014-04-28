//acceptance tests
var request = require("request");
var util = require('util');
var assert = require('assert');

var baseUrl = "http://127.0.0.1:8052/cloud/";

exports.testCloudCall = function(finish){
  request({url: baseUrl + "hello", method: 'POST', json: true}, function(err, response, body){
    console.log("body", body);
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    console.log("body", body.text);
    assert.equal(0, body.text.indexOf('Hello from FeedHenry'));
    finish();
  });
};

exports.testGetWeather = function(finish){
  request({url: baseUrl + "getWeather", method: 'POST', json: {"lat":52.251,"lon":-7.153}}, function(err, response, body){
  console.log("body: " + util.inspect(body))
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode);
    assert.ok(body.data);
    finish();
  });
};

/*
exports.testSaveData = function(finish){
  request({url: baseUrl + "saveData", method: 'POST', json: {"collection": "test", "document": "test"}}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode, 'Unexpected response: ' + util.inspect(response.body));
    finish();
  });
};
*/
