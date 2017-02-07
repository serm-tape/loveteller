var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var express = require("express");
var Promise = require("bluebird");

var bodyParser = require("body-parser");
var helmet = require("helmet");
var fs = require("fs-extra");
var klawSync = require('klaw-sync');

function setupMiddlewareRoute(app) {
    setupMiddleware(app);
    setupRoute(app);
}



module.exports = setupMiddlewareRoute;


////////////////////
/// FUNCTION DEF
////////////////////



function setupMiddleware(app) {

    ////////////////////////////////////
    //// SET UP THIRD PARTY MIDDLE WARE
    /////////////////////////////////////

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json({limit : "10mb"}));
    app.use(helmet());


    app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        }
    );


    ////////////////////////
    /// SET UP MIDDLE WARE
    ///////////////////////
    var middlewareDir = path.join(BASE_PATH, "middleware");
    logger.debug("middlewareDir : " + middlewareDir );

    var middlewareFiles = klawSync(middlewareDir, {nodir: true});
    logger.debug("middlewareFiles : " , middlewareFiles);

    middlewareFiles.forEach(function(file){
        var middlewareObj = require(file.path);
        app.use("", middlewareObj);
    });
    logger.debug("COMPLETE ADD MIDDLE WARE");
}

function setupRoute(app) {

    var routeDir = path.join(BASE_PATH, "routes");
    logger.debug("routeDir : " + routeDir);

    var routeFiles = klawSync(routeDir, {nodir: true});
    logger.debug("routeFiles : ", routeFiles);

    routeFiles.forEach(function(file){
        var routeObj = require(file.path);
        app.use("", routeObj);
    });
    logger.debug("COMPLETE ADD ROUTE");
}
