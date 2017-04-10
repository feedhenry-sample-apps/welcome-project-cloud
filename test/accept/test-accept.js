//acceptance tests
var util = require('util');
var assert = require('assert');
var nock = require('nock');
var request = require("request");
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
exports.testGetWeather = function(finish) {
  nock('http://127.0.0.1:8001', {"encodedQueryParams":true})
   .post('/getWeather', {"lat":52.251,"lon":-7.153})
   .reply(200, {"data":{ date: '2013-04-10',
       high: '11',
       low: '2',
       desc: 'Partly cloudy',
       icon: 'http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png' }});

  request({url: baseUrl + "getWeather", method: 'POST', json: {"lat":52.251,"lon":-7.153}}, function(err, response, body){
  console.log("body: " + util.inspect(body))
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode);
    assert.ok(body.data);
    assert.equal("2013-04-10", body.data.date);
    finish();
  });
};


exports.testSaveData = function(finish){
  process.env.FH_DB_PERAPP = true;
  process.env.FH_MONGODB_CONN_URL = "mongodb://127.0.0.1:27017/test";

  request({url: baseUrl + "saveData", method: 'POST', json: {"collection": "test", "document": {"name" : "testing"}}}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode, 'Unexpected response: ' + util.inspect(response.body));
    return finish();
  });
};

