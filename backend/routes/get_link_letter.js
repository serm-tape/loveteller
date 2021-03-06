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

        var updateData = {
            targetRead : letter.targetRead | 0,
            anotherRead :  letter.anotherRead | 0
        };



        if (letter.from === req.header("fbId")) {
            res.json({
                fbId : letter.from,
                message1 : letter.message1,
                message2 : letter.message2
            });
            return;
        }

        var returnMessage = {
            fbId : letter.from
        };
        var targetUser = CommonUtil.validateHashPassword(facebookInfo.data.name, letter.to);

        if (targetUser) {
            returnMessage.message1 = letter.message1;
            updateData.targetRead = updateData.targetRead + 1
        } else {
            returnMessage.message1 = letter.message2;
            updateData.anotherRead = updateData.anotherRead + 1
        }

        return linkRef.update(updateData)
        .then(function() {
            res.json(returnMessage);
        })

    })
    .catch(function(ex){
        logger.error(ex + " " + ex.stack);
        var errorResponse = CommonUtil.createErrorResponse(500,
                ErrorCode.INTERNAL_SERVER_ERROR, "Internal server error");
        res.status(500).json(errorResponse);
    });

});

module.exports = router;
