
let formatted_units = require ("../src/api/services/formatted_units")
var config = require("../src/config/locals.js");
var expect = require('chai').expect;

describe("formatted_units", () => {
    console.log("formatted_units")
    it('should return blah', function () {
        localconfig.units = "IMPERIAL"
        let x = formatted_units.formattedTemperature({units: "IMPERIAL", value: 72.0});
        console.log(x)
        expect(x.value).equals(72.0)
        localconfig.units = "METRIC"
        x = formatted_units.formattedTemperature({units: "METRIC", value: 72.0});
        console.log(x)
        expect(x.value).equals( 72.0)

        localconfig.units = "IMPERIAL"
        x = formatted_units.formattedAtmosphericPressure({units: "H", value: 72.0});
        expect(x).equals("72.0 H")
        console.log(x)
        x = formatted_units.formattedWaterLevel({units: "G", value: 72.0});
        expect(x).equals("EMPTY")
        console.log(x)
        x = formatted_units.formattedWaterLevel({units: "G", value: -72.0});
        expect(x).equals("48.9 gallons")
        console.log(x)
        return "blah";
    });
});