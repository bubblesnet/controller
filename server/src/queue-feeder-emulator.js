const bubbles_queue = require("./api/models/bubbles_queue")
let state = require('./initial_state.json')
const util = require('./util')
const emulator_util = require('./emulator-util')

let current_state = {}

let __feederClient

function setClient(client) {
    __feederClient = client;
}

const updateStatusQueue = async() => {
    setTimeout(() => {
        emulator_util.sendFakeStatusToQueue()
    }, 10000);
}

bubbles_queue.init(setClient).then(( value ) => {
    current_state = state;
    x = updateStatusQueue();
});

