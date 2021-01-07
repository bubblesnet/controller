const bubbles_queue = require("./api/models/bubbles_queue")
let state = require('./initial_state.json')

let current_state = {}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let __feederClient

function setClient(client) {
    __feederClient = client;
}

/*
       "message_type": "measurement",
            "measurement_type": "temperature",
            "sample_timestamp": "105050987",
            "sensor_name": "thermometer_top",
            "value":  "27.3",
            "units": "C"

 */
function sendFakeMeasurementToTopic() {
    console.log("sendFakeMeasurementToTopic")

    let msg = {}
    msg.message_type = "measurement"
    msg.measurement_type= "humidity"
    msg.sensor_name = "humidity_internal"
    msg.sample_timestamp = Date.now = () => new Date().getTime();
    msg.value = 20+ getRandomInt(69)
    msg.units = "F"
    console.log("Sending humidity to " + msg.value)
    console.log("Sending message to topic " + JSON.stringify(msg))
    bubbles_queue.sendMessageToTopic(__feederClient,JSON.stringify(msg))
    setTimeout(() => {
        sendFakeMeasurementToTopic()
    }, 5000);

}

function sendFakeStatusToTopic() {
    console.log("sendFakeStatusToQueue")
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
//    if (bubbles_queue.__stompClient != null) {
        console.log("sending message to topic")
        bubbles_queue.sendMessageToTopic(__feederClient,JSON.stringify(current_state))
//    }
    setTimeout(() => {
        sendFakeStatusToTopic()
    }, 10000);

}
const updateStatusTopic = async() => {
    setTimeout(() => {
//        sendFakeStatusToTopic()
        sendFakeMeasurementToTopic()
    }, 10000);
}


        bubbles_queue.init(setClient).then(( value ) => {
            current_state = state;
            updateStatusTopic();
        });

