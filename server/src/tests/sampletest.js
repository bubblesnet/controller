var server = require('../www')
    , http = require('./support/http');
/*
describe('User API', function () {
    before(function (done) {
        http.createServer(server, done);
    });
    console.log('before first get');
    it('GET /users should return 200', function (done) {
        console.log('inside first get');
        http.request()
            .get('/users')
            .expect(200, done);
    });
    console.log('before second get');
    it('POST /users should return 200', function (done) {
        console.log('inside second get');
        http.request()
            .post('/users')
            .set('Content-Type', 'application/json')
            .write(JSON.stringify({username: 'test', password: 'pass'}))
            .expect(200, done);
    });
});

describe('Installation Status', function () {
    before(function (done) {
        http.createServer(server, done);
    });
    console.log('before first get');
    it('GET /status/:userid should return 200', function (done) {
        console.log('inside first get');
        http.request()
            .get('/status/90000009')
            .expect(200, done);
    });
});
*/