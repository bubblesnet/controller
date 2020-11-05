/**
 * Created by rodley on 4/21/2017.
 */
var email = require('../routes/email');

describe('Hardwired test Email API', function () {
    it('email should return 200', function (done) {
        console.log('calling last door action');
        email.sendATestEmail(function (err, response) {
            console.log('called email callback with eventresult = ' + JSON.stringify(response));
            done();
        });
    });
});

describe('Parameterized test Email API', function () {
    it('email should return 200', function (done) {
        console.log('calling last door action');
        email.sendAMessage('john@rodley.com', 'rodley@rodley.com', 'unit test parameterized', 'unit test shortmessage', 'unit test long message', function (err, response) {
            console.log('called email callback with eventresult = ' + JSON.stringify(response));
            done();
        });
    });
});