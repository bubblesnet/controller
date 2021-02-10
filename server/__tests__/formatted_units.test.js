
let formatted_units = require ("../src/api/services/formatted_units")
var config = require("../src/config/locals.js");
var expect = require('chai').expect;

describe("formatted_units", () => {
    console.log("formatted_units")
    it('Happy path', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        localconfig.units = "IMPERIAL"
        let x = formatted_units.formattedTemperature({units: "IMPERIAL", value: 72.0});
        console.log("formatted_temperature " + x)
        expect(x.value).equals("72.0")
        localconfig.units = "METRIC"
        x = formatted_units.formattedTemperature({units: "METRIC", value: 72.0});
        console.log("formatted_temperature " + x)
        expect(x.value).equals("72.0")

        localconfig.units = "IMPERIAL"
        x = formatted_units.formattedAtmosphericPressure({units: "H", value: 72.0});
        expect(x).equals("72.0 H")
        console.log("formattedAtmosphericPressure " + x)
        x = formatted_units.formattedWaterLevel({units: "G", value: 72.0});
        expect(x).equals("EMPTY")
        console.log("formattedAtmosphericPressure " + x)
        x = formatted_units.formattedWaterLevel({units: "G", value: -72.0});
        expect(x).equals("48.9 gallons")
        console.log("formattedAtmosphericPressure " + x)

        localconfig.units = 'IMPERIAL'
        x = formatted_units.formattedTemperature({units: "METRIC", value: 0.0});
        expect(x.value).equals("32.0")

        localconfig.units = 'METRIC'
        x = formatted_units.formattedTemperature({units: "IMPERIAL", value: 32.0});
        expect(x.value).equals("0.0")

        return "blah";
    });
});