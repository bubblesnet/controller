
let current_state = {}
let connection

const axios = require('axios')


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sendFakeMeasurement() {
    x = getRandomInt(9)
    switch (x) {
        case 1:
            sendMeasurement("temperature", "temp_air_top", 20 + getRandomInt(79), "F")
            break;
        case 2:
            sendMeasurement("temperature", "temp_air_middle", 20 + getRandomInt(79), "F")
            break;
        case 3:
            sendMeasurement("temperature", "temp_air_bottom", 20 + getRandomInt(79), "F")
            break;
        case 4:
            sendMeasurement("temperature", "temp_air_external", 20 + getRandomInt(79), "F")
            break;
        case 5:
            sendMeasurement("temperature", "temp_water", 20 + getRandomInt(79), "F")
            break;
        case 6:
            sendMeasurement("humidity", "humidity_internal", 20 + getRandomInt(79), "%")
            break;
        case 8:
            sendMeasurement("humidity", "humidity_external", 20 + getRandomInt(79), "%")
            break;
        case 7:
            sendMeasurement("level", "tub_water_level", getRandomInt(150)/10, "gallons")
            break;
        default:
            break;
    }
    setTimeout(() => {
        sendFakeMeasurement()
    }, 10000);
}


    function sendMeasurement(measurement_type,name,value,units) {
    console.log("sendFakeMeasurement")

    let msg = {}
    msg.message_type = "measurement"
    msg.measurement_type= measurement_type
    msg.sensor_name = name
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
    current_state.status.humidity_internal = 60 + getRandomInt(30)
    let x = getRandomInt(2);
    if(x == 0 )
        current_state.status.temp_air_middle_direction = ""
    else if (x == 1)
        current_state.status.temp_air_middle_direction = "down"
    else
        current_state.status.temp_air_middle_direction = "up"

    current_state.status.temp_air_top = 60 + getRandomInt(39)
    current_state.status.temp_air_middle = 50 + getRandomInt(49)
    current_state.status.temp_air_bottom = 40 + getRandomInt(49)
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





