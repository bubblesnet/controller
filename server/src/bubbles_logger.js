// copyright and license inspection - no issues 4/13/22


var winston = require('winston');
var path = require('path');

winston.level = process.env.LOG_LEVEL

// Set this to whatever, by default the path of the script.
var logPath = __dirname;
const tsFormat = () => (new Date().toISOString());

const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'errors.log'),
            timestamp: tsFormat,
            level: 'info'
        })
    ]
});

const log = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
            level: winston.level
        }),
        new winston.transports.File({
            filename: path.join(logPath, 'bubblesnet.log'),
            timestamp: tsFormat,
            level:  winston.level
        })
    ]
});


module.exports = {
    errorLog: errorLog,
    log: log
};