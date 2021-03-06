import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as socketIO from 'socket.io';
import {RtBroker} from './RtBroker';
import {argv} from 'yargs';
import {SecurityService} from './services/SecurityService';

var env = argv['env'] || 'dev';

console.log(`Server startup: env: ${env}`);

var mongoskin = require('mongoskin');   //Using require since there is no tsd file

import {ApiRouting} from './routing/ApiRouting';

var config = {
    staticRoot: '',
	port: 3000,
	mongo_url: process.env.CELLDATA_URL || 'mongodb://@localhost:27017/celldata',
    mongo_animal_url: process.env.ANIMALS_URL || 'mongodb://@localhost:27017/animals',
    mashupSecret: process.env.MASHUP_SECRET
};

//console.log(`MASHUP_SECRET: ${config.mashupSecret}`);

if (process.env.PORT) {
    config.port = parseInt(process.env.PORT);
}

console.log(`__dirname is ${__dirname}.`);

//var debug = debug('Mashup');

// For the dev environment, we serve at a root where node_modules can be referenced.  Not so for production.
if (env === 'dev') {
    config.staticRoot = path.join(__dirname, '../dev');
} else {
    config.staticRoot = path.join(__dirname, '..', env);
}

console.log(`Static root is: ${config.staticRoot}`);
console.log('Configuration: ', config);

var app = express();

if (env === 'dev') {
    console.log('Configurating the dev environment');
    app.use('/', express.static(config.staticRoot));
    app.use('/dist/dev', express.static(config.staticRoot));
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

    console.log('app', app);
} else {
    console.log('Configurating the production environment');
    app.use(express.static(config.staticRoot));
}

app.use(logger('dev'));
app.use(bodyParser({
    limit: '100mb'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var db = mongoskin.db(config.mongo_url, {safe:true});
var animalsdb = mongoskin.db(config.mongo_animal_url, {safe:true});

//Inject the db into the request object
app.use(function(req, res, next){
    req['db'] = db;
    req['animalsdb'] = animalsdb;
    next();
});

let securityService = new SecurityService();
var apiRouteCreator = new ApiRouting(app, securityService, config.mashupSecret);
app.use('/api', apiRouteCreator.getApiRoutingConfig());

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

app.use(<express.ErrorRequestHandler> function(err, req, res, next) {
    console.log('Error status is: ', err.status);
    console.log('Error message', err.message || err.msg);

    if (err.status === 200) {
        res.status(500);
    } else {
        res.status(err.status || 500);
    }

    res.send(err);
});

app.set('port', config.port || 3000);

var http_server = require('http').createServer(app);
var io = socketIO(http_server);

http_server.listen(app.get('port'), function() {
     console.log('Express server listening on port ' + app.get('port'));
});

// var express_server = app.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + express_server.address().port);
// });

var broker = new RtBroker(io, securityService);
console.log(`Created real time broker ${broker}`);
