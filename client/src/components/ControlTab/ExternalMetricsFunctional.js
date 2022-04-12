import React from "react";
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderBarometer from "./BarometerFunctional";
// import {Text} from "grommet"
import sprintf from 'sprintf-js';

function RenderExternalMetrics (props) {
    let value = ""
    if( typeof(props.sensor_readings.light_external) != 'undefined' ) {
        value = sprintf.sprintf("%.1f", props.sensor_readings.light_external)
    }

    let ret =
        <>
            <div>
                <div id={"sun-moon-icon-holder"}/>
                <div className={"value-holder-light-external"}>{value} lux</div>
            </div>
            <div id="airtempexternal-holder">
                <RenderThermometer exists={props.station.thermometer_external}
                                   display_settings={props.display_settings}
                                   currentTemperature={props.sensor_readings.temp_air_external}
                                   units={props.display_settings.temperature_units}
                                   direction={props.sensor_readings.temp_air_external_direction}/>
            </div>
            <div id="humidityexternal-text-holder">
                <RenderHygrometer prefix={"external"} exists="true"
                                  display_settings={props.display_settings}
                                  currentHumidity={props.sensor_readings.humidity_external}
                                  units={props.display_settings.humidity_units}
                                  direction={props.sensor_readings.humidity_external_direction}/>
            </div>
            <div className="externalpressure-holder">
                <RenderBarometer exists={props.station.pressure_sensors}
                                 display_settings={props.display_settings}
                                 holderClassName={"pressure-holder"}
                                 textClassName={"pressure-text-holder"}
                    iconClassName={"pressure-icon-holder"}
                    value={props.sensor_readings.pressure_external}
                    units={props.display_settings.pressure_units}
                    direction={props.sensor_readings.pressure_external_direction} />
            </div>
        </>
    return (ret)
}

export default RenderExternalMetrics;
