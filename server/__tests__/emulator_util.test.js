//             z = {measurement_type: "level", sensor_name: "water_level_sensor", measurement_name: "tub_water_level", value: util.getRandomInt(150) / 10, units: "gallons"}

const emulator_util = require('../src/emulator-util')
const expect = require('chai').expect;

describe("emulator-util",   () => {
    console.log("fake measurement")
    it('fake measurement', function () {
        for (let i = 0; i < 100; i++) {
            let x = emulator_util.getFakeMeasurement()
            expect(x.measurement_type)
            expect(x.sensor_name)
            expect(x.sensor_name)
            expect(x.measurement_name)
            expect(x.value)
            expect( x.units )
        }
    });
});
