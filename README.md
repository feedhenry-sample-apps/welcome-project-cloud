# Development
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/welcome-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/welcome-cloud)

See [Cloud Development](http://docs.feedhenry.com/v2/cloud_development.html) page about how to develop cloud app.

# Tests

All the tests are in the "test/" directory. The cloud app is using moka as the test runner. 

To run:
* unit the tests:
```
npm run unit
```
* acceptance tests
```    
mongod
npm run serve
npm run accept
```
* coverage report for unit tests:
```
npm run coverage-unit
```

