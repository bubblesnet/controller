const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const cabinet = require("../src/api/models/cabinet");
const assert = require('chai').assert;

let created_cabinetid = -1


let good_update = {
    controller_hostname: "localhost",
    controller_api_port: 9999,
        stage: "updatedstage",
        light_on_hour: 14,
        tamper_xmove: 0.99,
        tamper_ymove: 0.99,
        tamper_zmove: 0.99,
        time_between_pictures_in_seconds: 122,
        camera_picamera: true,
        camera_resolutionX: 1,
        camera_resolutionY: 1,
        time_between_sensor_polling_in_seconds: 133,
        humidifier: true,
        humidity_sensor_internal: true,
        humidity_sensor_external: true,
        heater: true,
        thermometer_top: true,
        thermometer_middle: true,
        thermometer_bottom: true,
        thermometer_external: true,
        thermometer_water: true,
        water_pump: true,
        air_pump: true,
        light_sensor_internal: true,
        cabinet_door_sensor: true,
        outer_door_sensor: true,
        movement_sensor: true,
        pressure_sensors: true,
        root_ph_sensor: true,
        enclosure_type: true,
        water_level_sensor: true,
        tub_depth: 10.10,
        tub_volume: 99.9,
        intake_fan: true,
        exhaust_fan: true,
        heat_lamp: true,
        heating_pad: true,
        light_bloom: true,
        light_vegetative: true,
        light_germinate: true
}

describe("cabinet",   () => {
    console.log("create/udpate/delete cabinet")
    it('Empty cabinet with update/delete', async function () {
        let user_list = await user.getAllUsers()
        expect(user_list).not.undefined
        expect(user_list.length).not.lessThan(0)
        let userid = user_list[0].userid
        expect(userid).not.undefined
        expect(userid).not.lessThan(0)
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        try {
            let x = await cabinet.createCabinet({userid: userid});
            console.log("new cabinet = " + JSON.stringify(x))
            created_cabinetid = x.cabinetid
            expect(created_cabinetid >= 0)
            good_update.cabinetid = created_cabinetid
            let y = await cabinet.updateCabinet(good_update)
            expect(y).not.undefined
            expect(y.rowcount).equals(1)


            let z = await cabinet.deleteCabinet(created_cabinetid)
            expect(z).not.undefined
            expect(z.cabinetid).not.undefined
            expect(z.cabinetid).equals(created_cabinetid)


        } catch (err) {
            console.log("new cabinet with delete error "+err)
            expect(false)
        }
    })
});
