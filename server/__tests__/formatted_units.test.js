formatted_units = require ("../src/api/services/formatted_units")

describe("formatted_units", () => {
    describe('Temp', () => {
        console.log("formatted_units")
        it('should return blah', async function () {
            formatted_units.formattedTemperature({units: "F", value: 72.0});
            formatted_units.formattedAtmosphericPressure({units: "H", value: 72.0});
            formatted_units.formattedWaterLevel({units: "G", value: 72.0});
            return "blah";
        });
    });
})