//acceptance tests
var request = require("request");
var util = require('util');
var assert = require('assert');
var nock = require('nock');
var grunt = require('grunt');
var baseUrl = "http://127.0.0.1:8001/";

exports.testCloudCall = function(finish){
  request({url: baseUrl + "hello", method: 'POST', json: true}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    console.log("body", body.text);
    assert.equal(0, body.text.indexOf('Hello from FeedHenry'));
    return finish();
  });
};

// TODO weather provider need keys
// exports.testGetWeather = function(finish) {
//   request({url: baseUrl + "getWeather", method: 'POST', json: {"lat":52.251,"lon":-7.153}}, function(err, response, body){
//   console.log("body: " + util.inspect(body))
//     assert.ok(!err, 'Unexpected error: ', util.inspect(err));
//     assert.equal(200, response.statusCode);
//     assert.ok(body.data);
//     assert.equal("2013-09-19", body.data[0].date);
//     return finish();
//   });
// };


exports.testSaveData = function(finish){
  process.env.FH_DB_PERAPP = true;
  process.env.FH_MONGODB_CONN_URL = "mongodb://127.0.0.1:27017/test";

  request({url: baseUrl + "saveData", method: 'POST', json: {"collection": "test", "document": {"name" : "testing"}}}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode, 'Unexpected response: ' + util.inspect(response.body));
    return finish();
  });
};

