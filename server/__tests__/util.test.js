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
    it('readJson container names', function () {
        let x = util.readJsonFile("src/container_names.json")
        expect( x )
    });
    it('readJson module types', function () {
        let x = util.readJsonFile("src/module_types.json")
        expect( x )
    });

});