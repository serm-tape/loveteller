
var _ = require("lodash");
var winston = require("winston");
require("winston-daily-rotate-file");
var path = require("path");
var uuidV4 = require('uuid/v4');
var crypto = require("crypto");
var randomstring = require("randomstring");
var fs = require('fs');

var BASE_PATH = process.env.NODE_ENV_BASE_PATH || global.BASE_PATH ;


function createLogger(label) {

	var logConfig = require(path.join(BASE_PATH,"config/logconfig.js"));
	var consoleLogConfig = _.clone(logConfig.consoleLogConfig);
	consoleLogConfig.label = label;
	var consoleTransport = new (winston.transports.Console)(consoleLogConfig);

	var fileRotateConfig = _.clone(logConfig.fileRotateConfig);
	fileRotateConfig.label = label;
	var fileRotateTransport = new (winston.transports.DailyRotateFile)(fileRotateConfig);

	var logger = new (winston.Logger)({
		levels : _.clone(logConfig.levels),
		colors : _.clone(logConfig.colors),
		transports : [
			consoleTransport,
			fileRotateTransport
		]
	});

	return logger;
}

function filepathToLabel(filepath) {
	return path.relative(BASE_PATH, filepath);
}

function createErrorResponse(status, code, message, devMessage, moreInfo, data) {
    var tmpData = {
        status : status,
        code : code,
        message : message,
        devMessage : devMessage,
        moreInfo : moreInfo,
        data : data
    };

    var returnObj = {};

    for (var key in tmpData) {
        if(!(_.isNil(tmpData[key])) && tmpData[key] !== "" ) {
            returnObj[key] = tmpData[key];
        }
    }
    return returnObj;
}

function createSalt() {
    return uuidV4().substring(0,8);
}

function hashPassword(salt, password) {
    var sha512 = crypto.createHash('sha512');
    password = salt + (sha512.update( salt + password ,"utf8").digest('base64'));
    return password;
}

function validateHashPassword(rawPassword, inputHashPassword) {
    var salt = inputHashPassword.substring(0, 8);
    var resultHash = hashPassword(salt, rawPassword);
    return resultHash === inputHashPassword;
}

function randomNumberString(length) {
    return randomstring.generate({
        length : length,
        charset : "numeric"
    });
}

function randomString(length) {
    return randomstring.generate({
        length : length,
    });
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// function to encode file data to base64 encoded string
function base64EncodeFile(filePath) {
    // read binary data
    var bitmap = fs.readFileSync(filePath);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// assign vale from source to destination object
function assignBySpecificKey(source, destination, fieldNames) {
    fieldNames.forEach(function(name){
        if (!_.isNil(source[name])) {
            destination[name] = source[name];
        }
    });
}


module.exports = {
	createLogger : createLogger,
	filepathToLabel : filepathToLabel,
    createErrorResponse : createErrorResponse,
    createSalt : createSalt,
    hashPassword : hashPassword,
    validateHashPassword : validateHashPassword,
    randomNumberString : randomNumberString,
    getRandomInt : getRandomInt,
    getRandomArbitrary : getRandomArbitrary,
    base64EncodeFile : base64EncodeFile,
    assignBySpecificKey : assignBySpecificKey,
    randomString : randomString
};
