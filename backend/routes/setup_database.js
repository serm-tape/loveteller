var Promise = require("bluebird");
var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var crypto = require('crypto')
var fs = require("fs");
var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.post("/setup", function(req, res){

    var key = req.body.key;
    var algorithm = req.body.algorithm;

    try {
        var text  = fs.readFileSync(path.join(BASE_PATH, "config/firebase_config.json"), "utf8");
        var plain = decrypt(text, algorithm, key);
        var firebaseConfig = JSON.parse(plain);
        firebase.initializeApp(firebaseConfig);
        res.json({ status : "setup complete"});
    } catch (ex) {
        logger.error(""+ ex.stack);
        res.status(500).json({});
    }


});

function encrypt(text, algorithm, key){
    var cipher = crypto.createCipher(algorithm, key)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text, algorithm, key){
    var decipher = crypto.createDecipher(algorithm, key)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = router;
