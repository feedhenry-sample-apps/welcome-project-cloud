# FeedHenry Welcome Cloud App
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/welcome-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/welcome-cloud)

Cloud template app for the Welcome project. It listens for FeedHenry SDK cloud calls, stores data using MongoDB and provides location based weather data using a third party API.

## Build
```
npm install
```

## Run locally

### Setup MongoDB

In order to run the Welcome server locally you'll need to have [MongoDB](https://www.mongodb.com/) installed and running on your local machine. 

Start MongoDB server with:

```
mongod
```

By default, the Welcome server will try to access MongoDB on port `11211`, if you are running MongoDB on a different port you should set the `FH_MONGODB_CONN_URL` environment variable to the MongoDB connection URL.

### Setup Redis

In order to run the Welcome server locally you'll need to have [Redis](https://redis.io/) installed and running on your local machine.

Start Redis server with:
```
redis-server /usr/local/etc/redis.conf
```

### Start the server

```
grunt serve
```

The Welcome server will be availble at `localhost:8001`.

If you wish to run the server on a different port you should set the `FH_PORT`
environment variable to the port you want the server to run on.


## Development

See [Cloud Development](http://docs.feedhenry.com/v2/cloud_development.html) page about how to develop cloud app.

## Tests

All the tests are in the "test/" directory. The cloud app is using mocha as the test runner.

To run:

* all the tests:

With [MongoDB](#setup-mongodb) and [Redis](#setup-redis) running

```
npm test
```

* unit tests:

```
npm run unit
```
* acceptance tests:

With [MongoDB](#setup-mongodb) and [Redis](#setup-redis) running

```    
npm run accept
```

* coverage report:

```
npm run coverage
```

* coverage report for unit tests:

```
npm run coverage-unit
```
* coverage report for acceptance tests:

```
npm run coverage-accept
```

## Source code analysis

To get Plato's JavaScript source code visualization, static analysis, and complexity report:

```
npm run analysis
```


