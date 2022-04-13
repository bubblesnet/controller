// copyright and license inspection - no issues 4/13/22

const bubbles_queue = require("./api/models/bubbles_queue")
let state = require('./initial_state.json')
const util_emulator = require('./emulator-util')

let current_state = {}

let __feederClient

function setClient(client) {
    __feederClient = client;
}

const updateStatusTopic = async() => {
    setTimeout(() => {
//        sendFakeStatusToTopic()
        util_emulator.sendFakeMeasurementToTopic(__feederClient)
    }, 10000);
}

bubbles_queue.init(setClient).then(( value ) => {
    current_state = state;
    let x = updateStatusTopic();
});

