var Promise = require("bluebird");
var path = require("path");
var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;
var CommonUtil = require(path.join(BASE_PATH, "lib/CommonUtil.js"));
var logger = CommonUtil.createLogger(CommonUtil.filepathToLabel(__filename));
var axios = require("axios");

function getInformation(field, token) {
    var url = "https://graph.facebook.com/me"
    return axios.get(url , {
        params : {
            field : "id,last_name",
            access_token : token
        },
        responseType : "json"
    });
}

module.exports = {
    getInformation : getInformation
};
