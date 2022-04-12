let temperature_out_of_range_since
let temperature_low, temperature_high, temperature_units
let humidity_low,humidity_high, humidity_units
let pH_low, pH_high, pH_units
let water_level_low, water_level_high, water_level_units

function within_range(low,high,units,value, value_units ) {
    //
    if( units !== value_units ) {
        // convert
    }
    return( true )
}

function alert_service_callback(body) {
    console.log("Alert service analyzing message " + JSON.stringify(body))

    // are environmental measurements out-of-range?
    // temperature, humidity, water level, pH, light
    // If yes, push an alert onto the array
    switch( body.measurement_type ) {

        case 'temperature_middle': {
            if (!within_range(temperature_low, temperature_high, temperature_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return
        }
        case 'humidity_internal': {
            if (!within_range(humidity_low,humidity_high, humidity_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        case 'pH': {
            if (!within_range(pH_low, pH_high, pH_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        case 'light_internal': {
            // if any grow light is ON but light < minimum, that's an alert
            return;
        }
        case 'water_level': {
            if (!within_range(water_level_low, water_level_high, water_level_units, body.float_value, body.units)) {
                // do something
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        default: {
            break;
        }

    }

    // is this an event that, by itself triggers a notification?
    // door_open, door_close, movement,

    // for each alert in the array
        // are we already in an alert state for this condition?
        // if yes, delete it

}


module.exports = {
    alert_service_callback
}