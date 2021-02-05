
let current_state = {}
let connection

const axios = require('axios')
const util = require('./util')
const emulator_util = require('./emulator-util')


function sendFakeMeasurement() {
    let z = emulator_util.getFakeMeasurement()
    sendMeasurement(z.measurement_type,z.sensor_name,z.measurement_name, z.value,z.units)
    setTimeout(() => {
        sendFakeMeasurement()
    }, 10000);
}


    function sendMeasurement(measurement_type,sensor_name,measurement_name, value,units) {
    console.log("sendFakeMeasurement")

    let msg = {}
    msg.message_type = "measurement"
    msg.measurement_type= measurement_type
        msg.sensor_name = name
        msg.measurement_name = name
    msg.sample_timestamp = Date.now = () => new Date().getTime();
    msg.value = value
    msg.units = units
    console.log("Sending "+measurement_type+" to " + msg.value)
    console.log("Sending message to API " + JSON.stringify(msg))
        sendText(msg)
        console.log("end sendFakeMeasurement")
}

function sendText(msg) {
    url = "http://192.168.21.237:3003/api/measurement/999999/111111"

    axios
        .post(url, msg)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })

}

function sendFakeStatus() {
    current_state.status.humidity_internal = 60 + util.getRandomInt(30)
    let x = util.getRandomInt(2);
    if(x == 0 )
        current_state.status.temp_air_middle_direction = ""
    else if (x == 1)
        current_state.status.temp_air_middle_direction = "down"
    else
        current_state.status.temp_air_middle_direction = "up"

    current_state.status.temp_air_top = 60 + util.getRandomInt(39)
    current_state.status.temp_air_middle = 50 + util.getRandomInt(49)
    current_state.status.temp_air_bottom = 40 + util.getRandomInt(49)
    console.log("Sending humidity " + current_state.status.humidity_internal)
    sendText(current_state)
    setTimeout(() => {
        sendFakeStatus()
    }, 10000);

}
const updateStatus = async() => {
    setTimeout(() => {
//       sendFakeStatus()
        sendFakeMeasurement()
    }, 10000);
}


updateStatus();





