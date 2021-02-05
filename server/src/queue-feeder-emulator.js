const bubbles_queue = require("./api/models/bubbles_queue")
let state = require('./initial_state.json')
const util = require('./util')
const emulator_util = require('./emulator-util')

let current_state = {}

let __feederClient

function setClient(client) {
    __feederClient = client;
}

function sendFakeStatusToQueue() {
    console.log("sendFakeStatusToQueue")
    current_state = emulator_util.getFakeStatus()
    console.log("Sending humidity " + current_state.status.humidity_internal)
//    if (bubbles_queue.__stompClient != null) {
        console.log("sending message to topic")
        bubbles_queue.sendMessageToQueue(__feederClient,JSON.stringify(current_state))
//    }
    setTimeout(() => {
        sendFakeStatusToQueue()
    }, 10000);

}
const updateStatusQueue = async() => {
    setTimeout(() => {
        sendFakeStatusToQueue()
    }, 10000);
}

bubbles_queue.init(setClient).then(( value ) => {
    current_state = state;
    updateStatusQueue();
});

