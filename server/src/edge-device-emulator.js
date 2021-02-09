const axios = require('axios')
const emulator_util = require('./emulator-util')

const updateStatus = async() => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            emulator_util.sendFakeMeasurement()
        }, 10000);
        resolve();
    });
}

x = updateStatus();



