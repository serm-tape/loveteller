var Promise = require("bluebird");
var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var firebase = require("firebase");
var FirebaseConfig = require(path.join(BASE_PATH, "config/firebase_config.js"));


function setupDatabase() {
    setupFirebase();
    logger.debug("SET UP DATABASE COMPLETE");
}

module.exports = setupDatabase;


///////////////
// FUNCTION
//////////////

function setupFirebase() {
    firebase.initializeApp(FirebaseConfig);
}
