
const util = require("./util")

function getFakeMeasurement() {
    let x = util.getRandomInt(9)
    let z = {}
    // z.measurement_type,z.sensor_name,z.measurement_name, z.value,z.units
    switch (x) {
        case 1:
            z = {measurement_type: "temperature", sensor_name: "thermometer_top", measurement_name: "temp_air_top", value: 20 +util.getRandomInt(79), units: "F"}
            break;
        case 2:
            z = {measurement_type: "temperature", sensor_name: "thermometer_middle", measurement_name: "temp_air_middle", value: 20 +util.getRandomInt(79),units: "F"}
            break;
        case 3:
            z = {measurement_type: "temperature", sensor_name: "thermometer_bottom", measurement_name: "temp_air_bottom", value: 20 +util.getRandomInt(79), units: "F"}
            break;
        case 4:
            z = {measurement_type: "temperature", sensor_name: "thermometer_external", measurement_name: "temp_air_external", value: 20 +util.getRandomInt(79), units: "F"}
            break;
        case 5:
            z = {measurement_type: "temperature", sensor_name: "thermometer_water", measurement_name: "temp_water", value:20 +util.getRandomInt(79), units: "F"}
            break;
        case 6:
            z = {measurement_type: "humidity", sensor_name: "humidity_sensor_internal", measurement_name: "humidity_internal", value:20 +util.getRandomInt(79), units: "%"}
            break;
        case 8:
            z = {measurement_type: "humidity", sensor_name: "humidity_sensor_internal", measurement_name: "humidity_external", value: 20 +util.getRandomInt(79), units: "%"}
            break;
        case 7:
            z = {measurement_type: "level", sensor_name: "water_level_sensor", measurement_name: "tub_water_level", value: util.getRandomInt(150) / 10, units: "gallons"}
            break;
        default:
            break;
    }
    return (z);
}

module.exports = {
    getFakeMeasurement: getFakeMeasurement
}