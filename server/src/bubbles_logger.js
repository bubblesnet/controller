/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


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