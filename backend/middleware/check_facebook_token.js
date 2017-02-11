var Promise = require("bluebird");
var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var FacebookUtil = require(path.join(BASE_PATH, "lib/FacebookUtil.js"));
var ErrorCode = require(path.join(BASE_PATH, "lib/ErrorCode.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var express = require("express");


var router = express.Router();

router.use("/links", function(req, res, next){


    var field = "id,last_name";

    FacebookUtil.getInformation(field, req.header("fbToken"))
    .then(function(result) {
        logger.debug(result.data);


        if (result.status !== 200) {
            res.status(result.status).json({
                status : result.status,
                statusText : result.statusText
            });
            return;
        }

        if (result.data.error || result.data.id !== req.header("fbId") ) {
            res.status(401).json(CommonUtil.createErrorResponse(401, ErrorCode.UNAUTHORIZED, "Please check fbToken"));
            return;
        }
        return next();
    })
    .catch(function(ex){
        logger.error(ex + " " + ex.stack);
        var errorResponse = CommonUtil.createErrorResponse(500,
                ErrorCode.INTERNAL_SERVER_ERROR, "Internal server error");
        res.status(500).json(errorResponse);
    });


});

module.exports = router;
