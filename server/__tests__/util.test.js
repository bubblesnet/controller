const util = require('../src/util')

const expect = require('chai').expect;

describe("util",   () => {
    console.log("normalizeport")
    it('normalizeport error', function () {
        let x = util.normalizePort("XYTZ")
        expect( !x )
    });
    it('normalizeport good', function () {
        let x = util.normalizePort("9000")
        expect( x ).equals(9000)
    });
});
