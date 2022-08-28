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


/**
 * Created by rodley on 4/21/2017.
 */
const log = require("../../bubbles_logger").log

const email = require('../services/email');
const alertcondition = require('./alertcondition')

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

exports.createNotification = function (notification, cb) {
    return pool.query('insert into notification (alertconditionid_Alertcondition, userid_User, datetimemillis, email_required, email_recipient, sms_required, sms_recipient) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [notification.alertconditionid_Alertcondition, notification.userid, notification.datetimemillis,
            notification.email_required, notification.email_recipient, notification.sms_required, notification.sms_recipient], function (err, result) {
        log.info('createNotification for alertcondition ' + notification.alertconditionid_Alertcondition + ' returned err ' + err + ' result ' + JSON.stringify(result));
//        log.info('setEmailNotificationSent results = ' + JSON.stringify(result));
//        if (err == null) {
            return cb(err, result);
//        }
        });

};

exports.setEmailNotificationSent = function (notification, cb) {
    return pool.query("update notification set email_sent=B'1' where notificationid=$1", [notification.notificationid], function (err, result) {
        log.info('setEmailNotificationSent id ' + notification.notificationid + ' returned err ' + err + ' result ' + result);
//        if (err == null) {
        return cb(err, result);
//        }
    });
};
