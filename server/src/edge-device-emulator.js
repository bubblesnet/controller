
let current_state = {}
let connection

const axios = require('axios')
const util = require('./util')
const emulator_util = require('./emulator-util')


function sendFakeMeasurement() {
    let z = emulator_util.getFakeMeasurement()
    sendMeasurement(z)
    setTimeout(() => {
        sendFakeMeasurement()
    }, 10000);
}


    function sendMeasurement(msg) {
        console.log("sendFakeMeasurement")

        msg.sample_timestamp = Date.now = () => new Date().getTime();
        console.log("Sending message to API " + JSON.stringify(msg))
        sendText(msg)
        console.log("end sendFakeMeasurement")
    }

function sendText(msg) {
    let url = "http://192.168.21.237:3003/api/measurement/999999/111111"

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
    current_state = emulator_util.getFakeStatus()
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





