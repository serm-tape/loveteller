require("babel-core").transform("code");


import Promise from "bluebird";
import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
var fse = Promise.promisifyAll(require("fs-extra"));

//////////////////////
// SETUP PROMISE
/////////////////////
Promise.config({
	// Enable warnings
	warnings: true,
	// Enable long stack traces
	longStackTraces: true,
	// Enable cancellation
	cancellation: true,
	// Enable monitoring
	monitoring: true
});

/////////////////
// SET UP LOG
////////////////
global.BASE_PATH = __dirname;
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));


//////////////////////////////////
// SET UP ROUTE AND MIDDLE WARE
//////////////////////////////////

var setupMiddlewareRoute = require(path.join(BASE_PATH, "setup_middleware_route.js"));


////////////////////////////
// SET UP STATIC FILE
///////////////////////////

function setUpStaticFile(app) {
    app.use('/favicon.ico', express.static(path.resolve(__dirname, '../frontend/public/img/favicon.ico')));
    app.use('/img/', express.static(path.resolve(__dirname, '../frontend/public/img')));
    app.use('/font-awesome/', express.static(path.resolve(__dirname, '../node_modules/font-awesome')));
    app.use('/.well-known/', express.static(path.resolve(__dirname, '../frontend/public/.well-known')));
    app.get('/bundle.js', (req, res, next) => {
    	res.sendFile(path.resolve(__dirname, '../frontend', 'built', 'bundle.js'));
    });

    app.get('/bundle.js.map', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'built', 'bundle.js.map'));
    })


    app.get('*', (req, res, next) => {
    	res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
    });
}


///////////////////////
// START SERVER
//////////////////////

const api = express.Router();
const app = express();


process.on('uncaughtException', function (err) {
    logger.fatal("UNCAUGHTEXCEPTION|"+err+" "+err.stack);
});

Promise.resolve()
.then(function() {
    logger.info("START ADD MIDDLE WARE AND ROUTE");
    return setupMiddlewareRoute(app);
})
.then(function() {
    logger.info("START ADD STATIC");
    return setUpStaticFile(app);
})
.then(function() {
    const key = fs.readFileSync( '/etc/letsencrypt/live/loveteller.sermtape.com/privkey.pem','utf8');
    const cert = fs.readFileSync( '/etc/letsencrypt/live/loveteller.sermtape.com/fullchain.pem', 'utf8');
    const server = https.createServer(
        {key: key, cert: cert},
        app
    )  
    server.listen(443, function () {
        logger.info("Please set up your database at api/setup ");
    	logger.info('Example app listening on port 443!');
    });
})
.catch(function(ex){
    logger.fatal("ERROR IN SETUP SERVER " + ex.stack);
    process.exit();
});
