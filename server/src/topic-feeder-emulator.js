const bubbles_queue = require("./api/models/bubbles_queue")
let state = require('./initial_state.json')
const util_emulator = require('./emulator-util')

let current_state = {}

let __feederClient

function setClient(client) {
    __feederClient = client;
}

function sendFakeMeasurementToTopic() {
    console.log("sendFakeMeasurementToTopic")

    let msg = util_emulator.getFakeMeasurement()
    console.log("Sending message to topic " + JSON.stringify(msg))
    bubbles_queue.sendMessageToTopic(__feederClient,JSON.stringify(msg))
    setTimeout(() => {
        sendFakeMeasurementToTopic()
    }, 5000);

}

function sendFakeStatusToTopic() {
    console.log("sendFakeStatusToTopic")
        console.log("sending message to topic")
    current_state = util_emulator.getFakeStatus()
    bubbles_queue.sendMessageToTopic(__feederClient,JSON.stringify(current_state))
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

