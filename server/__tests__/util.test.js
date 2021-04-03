const util = require('../src/util')

const expect = require('chai').expect;

describe("util",   () => {
    console.log("normalizeport")
    it('normalizeport error', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let x = util.normalizePort("XYTZ")
        expect( !x )
    });
    it('normalizeport good', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let x = util.normalizePort("9000")
        expect( x ).equals(9000)
    });
    it('readJson container names', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let x = util.readJsonFile("src/container_names.json")
        expect( x )
    });
    it('readJson module types', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let x = util.readJsonFile("src/module_types.json")
        expect( x )
    });

});
