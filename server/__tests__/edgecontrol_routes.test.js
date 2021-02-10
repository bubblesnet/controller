
const expect = require("chai").expect;

const ecroutes = require('../src/api/routes/edgecontrol_routes')

let functions = []

let client = {
    on: function (code,cb) {
        console.log("on " + code)
        functions.push({code: code, cb: cb})
    },
    address: function(){ return({address:"testaddress",port:"testport"})},
    close: function() { console.log("client.close")}
}

describe("edgecontrol_routes routes",   () => {
    console.log("edgecontrol_routes routes")
    it('edgecontrol_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        let req = {
            params: {
                userid: 90000009,
                deviceid: 70000007,
                outletname: 'heater',
                onoff: "ON"
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
            setHeader: function(header,value) {
                console.log("Setting header " + header + " to value "+value)
            }
        }
        let remote = {address:"testaddress",port:"testport"}

        await ecroutes.getDeviceOutlets(client, req, res, function() {
            expect(false).to.be.true
        });
        for( let i = 0; i < functions.length; i++ ) {
            switch( functions[i].code ) {
                case 'listening':
                    functions[i].cb()
                    break;
                case 'message':
                    let message = {message:"AHHHHH!"}
                    functions[i].cb(JSON.stringify(message), remote);
                    break;
                case 'error':
                    let err = "errORRRRRRRR"
                    functions[i].cb(err)
                    break;
            }
        }
    });
});
