//             z = {measurement_type: "level", sensor_name: "water_level_sensor", measurement_name: "tub_water_level", value: util.getRandomInt(150) / 10, units: "gallons"}

const emulator_util = require('../src/emulator-util')
const expect = require('chai').expect;

describe("emulator-util",   () => {
    console.log("fake measurements and status")
    it('fake measurement', function () {
        for (let i = 0; i < 100; i++) {
            let x = emulator_util.getFakeMeasurement()
            expect(x.measurement_type)
            expect(x.sensor_name)
            expect(x.sensor_name)
            expect(x.measurement_name)
            expect(x.value)
            expect(x.units)

            let s = emulator_util.getFakeStatus()
            expect(s.status.humidity_internal);
            expect(s.status.temp_air_middle_direction)

            expect(s.status.temp_air_top);
            expect(s.status.temp_air_middle);
            expect(s.status.temp_air_bottom);

        }
    });
});
