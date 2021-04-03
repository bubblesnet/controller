const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const sitestation = require("../src/api/models/sitestation");
const test_utils = require("./test_utils")
const outlet = require("../src/api/models/outlet");
const device = require("../src/api/models/device");
const station = require("../src/api/models/station");
const modul = require("../src/api/models/module");
const assert = require('chai').assert;

let created_stationid = -1


let good_update = {
    controller_hostname: "localhost",
    controller_api_port: 9999,
        stage: "updatedstage",
        light_on_hour: 14,
        tamper_xmove: 0.99,
        tamper_ymove: 0.99,
        tamper_zmove: 0.99,
        time_between_pictures_in_seconds: 122,
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
        station_door_sensor: true,
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

let sensor_names = [
    "humidity_sensor_internal",
    "humidity_sensor_external",
    "thermometer_top",
    "thermometer_middle",
    "thermometer_bottom",
    "thermometer_external",
    "thermometer_water",
    "light_sensor_internal",
    "station_door_sensor",
    "outer_door_sensor",
    "movement_sensor",
    "pressure_sensors",
    "root_ph_sensor",
    "enclosure_type",
    "water_level_sensor"
    ]

let controllable_devices = [
    "humidifier",
    "water_pump",
    "air_pump",
    "heater",
    "intake_fan",
    "exhaust_fan",
    "heat_lamp",
    "heating_pad",
    "light_bloom",
    "light_vegetative",
    "light_germinate"
]
describe("cab",   () => {
    console.log("cab")
    it('postgres sqljson', async function () {

        let z = await test_utils.setupForThisFile(true,false)

        let user_list = await station.getConfigByUser(z.userid)
        expect(user_list).not.undefined
        let station_list = await sitestation.getConfigByDevice(z.userid, z.deviceid)
        expect(station_list).not.undefined
    });
});

describe("station",   () => {
    console.log("create/udpate/delete station")
    it('Empty station with update/delete', async function () {
        let user_list = await user.getAllUsers()
        expect(user_list).not.undefined
        expect(user_list.length).not.lessThan(0)
        let userid = user_list[0].userid
        expect(userid).not.undefined
        expect(userid).not.lessThan(0)

        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        try {
            let x = await station.createCabinet({userid: userid});
            console.log("new station = " + JSON.stringify(x))
            created_stationid = x.stationid
            expect(created_stationid >= 0)
            good_update.stationid = created_stationid

            let dev = {devicename: "testdevice", devicetypeid: 0, userid: userid, stationid: created_stationid}
            let d = await device.createDevice(dev);
            expect(d).not.undefined
            expect( d.deviceid).not.equals(0)
            let good_deviceid = d.deviceid
            console.log("Created deviceid " + good_deviceid)

            let y = await station.updateStation(good_update)
            expect(y).not.undefined
            expect(y.rowcount).equals(1)
            let bod = {userid: userid, stationid: created_stationid, deviceid: good_deviceid, name: "test", bcm_pin_number: 24, index: 3, onoff: true}
 //           console.log(JSON.stringify(bod))
            let a = await outlet.createOutlet(bod);
 //           console.log(JSON.stringify(a))
            expect(a.outletid).not.equals(0)

            let b = await outlet.updateOutlet({outletid: a.outletid, stationid: created_stationid, deviceid: good_deviceid, name: 'updatedoutlet', index: 14, bcm_pin_number: 101, onoff: false })
            expect(b).not.undefined
            expect(b.rowcount == 1 )

            let c = await outlet.deleteOutlet(b.outletid)
            expect(c).not.undefined
            expect(c.rowcount == 1 )

            let module_list = await modul.createDefaultSetOfModules({deviceid: good_deviceid})
            console.log("created module list " + JSON.stringify(module_list))
            expect(module_list).not.undefined
            expect(module_list.length).not.equals(0)

            let outlet_list = await outlet.createDefaultSetOfOutlets({stationid: created_stationid, deviceid: good_deviceid})
            expect(outlet_list).not.undefined
            expect(outlet_list.length).not.equals(0)

            let conf = await station.getConfigByStation(created_stationid)
            expect(conf).not.undefined
            expect(conf.attached_devices).not.undefined
            expect(conf.attached_devices.length).not.equals(0)
            console.log(JSON.stringify(conf))

            for( let j = 0; j < 2; j++ ) {
                let present = false
                if(j > 0 ) {
                    present = true
                }
                for (let i = 0; i < sensor_names.length; i++) {
                    let z = await station.setSensorPresent(created_stationid, sensor_names[i], present)
                    expect(z).not.undefined
                    expect(z.rowcount).not.undefined
                    expect(z.rowcount).equals(1)
                }

                for (let i = 0; i < controllable_devices.length; i++) {
                    let z = await station.setSensorPresent(created_stationid, controllable_devices[i], present)
                    expect(z).not.undefined
                    expect(z.rowcount).not.undefined
                    expect(z.rowcount).equals(1)
                }
            }

            for( let i = 0; i < outlet_list.length; i++ ) {
                let f = await outlet.deleteOutlet(outlet_list[i].outletid)
                expect(f).not.undefined
                expect(f.rowcount == 1 )
            }
            for( let i = 0; i < module_list.length; i++ ) {
                let g = await modul.deleteModule(module_list[i].moduleid)
                expect(g).not.undefined
                expect(g.rowcount == 1 )
            }

            let k = await station.getConfigByStation(created_stationid)
            expect(k).not.undefined
            console.log(JSON.stringify(k))

            let g = await device.deleteDevice(good_deviceid)
            expect(g).not.undefined
            expect(g.rowcount).not.equals(0)

            let z = await station.deleteStation(created_stationid)
            expect(z).not.undefined
            expect(z.stationid).not.undefined
            expect(z.stationid).equals(created_stationid)

        } catch (err) {
            console.log("new station with delete error "+err)
            expect(false)
        }
    })
});
