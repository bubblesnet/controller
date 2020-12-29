
let current_state = {}
let connection

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
    if (connection != null) {
        connection.sendText(JSON.stringify(current_state))
    }
    setTimeout(() => {
        sendFakeStatus()
    }, 10000);

}
const updateStatus = async() => {
    setTimeout(() => {
        sendFakeStatus()
    }, 10000);
}

(function () {
    exports.blah = function(conn, state) {
        connection = conn;
        current_state = state;    // This works because it's a shallow copy, subobjects are pointers.
        updateStatus();
}
}).call(this);

