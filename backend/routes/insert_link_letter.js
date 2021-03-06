var Promise = require("bluebird");
var path = require("path");
var util = require("util");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var ErrorCode = require(path.join(BASE_PATH, "lib/ErrorCode.js"));
var FacebookUtil = require(path.join(BASE_PATH, "lib/FacebookUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var express = require("express");
var firebase = require("firebase");
var router = express.Router();

router.post("/links", function(req, res) {

    var linkRef = firebase.database().ref("/loveletter/links");
    var newLinkRef = linkRef.push();

    FacebookUtil.getInformation("id,last_name", req.header("fbToken"))
    .then(function(facebook) {
        return newLinkRef.set({
            from : req.header("fbId"),
            to : CommonUtil.hashPassword(CommonUtil.createSalt(), req.body.fbName),
            message1 : req.body.message1,
            message2 : req.body.message2,
            targetRead : 0,
            anotherRead : 0
        });
    })
    .then(function(result) {
        res.json({
            linkId : newLinkRef.key
        });
    })
    .catch(function(ex){
        logger.error(ex + " " + ex.stack);
        var errorResponse = CommonUtil.createErrorResponse(500,
                ErrorCode.INTERNAL_SERVER_ERROR, "Internal server error");
        res.status(500).json(errorResponse);
    });
});
module.exports = router;
