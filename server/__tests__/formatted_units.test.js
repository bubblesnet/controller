formatted_units = require ("../src/api/services/formatted_units")
var config = require("../src/config/locals.js");

describe("formatted_units", () => {
    describe('Temp', () => {
        console.log("formatted_units")
        it('should return blah', async function () {
            localconfig.units = "IMPERIAL"
            formatted_units.formattedTemperature({units: "F", value: 72.0});
            localconfig.units = "METRIC"
            formatted_units.formattedTemperature({units: "C", value: 72.0});
            localconfig.units = "IMPERIAL"
            formatted_units.formattedAtmosphericPressure({units: "H", value: 72.0});
            formatted_units.formattedWaterLevel({units: "G", value: 72.0});
            formatted_units.formattedWaterLevel({units: "G", value: -72.0});
            return "blah";
        });
    });
})