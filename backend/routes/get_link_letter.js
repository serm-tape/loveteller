var Promise = require("bluebird");
var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var ErrorCode = require(path.join(BASE_PATH, "lib/ErrorCode.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var FacebookUtil = require(path.join(BASE_PATH, "lib/FacebookUtil.js"));
var express = require("express");
var firebase = require("firebase");
var router = express.Router();

router.get("/links/:linkId/letter", function(req, res) {

    var linkRef = firebase.database().ref("loveletter/links/" + req.params.linkId);
    logger.debug("firebase url : " + linkRef.toString());


    Promise.props({
        facebookInfo : FacebookUtil.getInformation("id,last_name", req.header("fbToken")),
        snapshot : linkRef.once("value")
    })
    .then(function(result) {
        var facebookInfo = result.facebookInfo;
        var letter = result.snapshot.val();

        if (letter.from === req.header("fbId")) {
            res.json({
                message1 : letter.message1,
                message2 : letter.message2
            });
            return;
        }

        var returnMessage = null;
        if (letter.to === facebookInfo.data.name) {
            returnMessage = letter.message1;
        } else {
            returnMessage = letter.message2;
        }
        res.json(returnMessage);

    })
    .catch(function(ex){
        logger.error(ex + " " + ex.stack);
        var errorResponse = CommonUtil.createErrorResponse(500,
                ErrorCode.INTERNAL_SERVER_ERROR, "Internal server error");
        res.status(500).json(errorResponse);
    });

});

module.exports = router;
