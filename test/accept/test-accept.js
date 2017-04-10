//acceptance tests
var util = require('util');
var assert = require('assert');
var nock = require('nock');
var request = require("request");
var app = require('../../application.js');

var baseUrl = "http://127.0.0.1:8001/";

exports.testCloudCall = function(finish){
  request({url: baseUrl + "hello", method: 'POST', json: true}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    console.log("body", body.text);
    assert.equal(0, body.text.indexOf('Hello from FeedHenry'));
    return finish();
  });
};

exports.testGetWeather = function(finish) {
  // Use nock to mock out the external weather service
  nock('http://api.worldweatheronline.com')
    .get('/free/v1/weather.ashx?q=52.251%2C-7.156&format=json&num_of_days=6&key=qfyye6yt5hedsgk8v8ey7n3n')
    .reply(200, {
      "data": {
        "weather": [{
          "date": "2013-09-19",
          "precipMM": "3.4",
          "tempMaxC": "18",
          "tempMaxF": "65",
          "tempMinC": "7",
          "tempMinF": "45",
          "weatherCode": "113",
          "weatherDesc": [{
            "value": "Sunny"
          }],
          "weatherIconUrl": [{
            "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
          }],
          "winddir16Point": "WNW",
          "winddirDegree": "286",
          "winddirection": "WNW",
          "windspeedKmph": "32",
          "windspeedMiles": "20"
        }]
      }
    });

  request({url: baseUrl + "getWeather", method: 'POST', json: {"lat":52.251,"lon":-7.156}}, function(err, response, body){
  console.log("body: " + util.inspect(body))
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode);
    assert.ok(body.data);
    assert.equal("2013-09-19", body.data[0].date);
    finish();
  });
};


exports.testSaveData = function(finish){
  nock('http://127.0.0.1:8001', {"encodedQueryParams":true})
   .post('/saveData', {"collection": "test", "document": {"name" : "testing"}})
   .reply(200, {"data":{ foo: "bar" }});

  request({url: baseUrl + "saveData", method: 'POST', json: {"collection": "test", "document": {"name" : "testing"}}}, function(err, response, body){
    assert.ok(!err, 'Unexpected error: ', util.inspect(err));
    assert.equal(200, response.statusCode, 'Unexpected response: ' + util.inspect(response.body));
    finish();
  });
};

