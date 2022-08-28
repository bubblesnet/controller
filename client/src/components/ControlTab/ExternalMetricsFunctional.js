/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from "react";
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderBarometer from "./BarometerFunctional";
// import {Text} from "grommet"
import sprintf from 'sprintf-js';

// copyright and license inspection - no issues 4/13/22

function RenderExternalMetrics (props) {
    let value = ""
    let light_sensor = <></>
    if( props.station.light_sensor_external === true && typeof(props.sensor_readings.light_external) != 'undefined' ) {
        value = sprintf.sprintf("%.1f", props.sensor_readings.light_external)
        light_sensor = <div><div id={"sun-moon-icon-holder"}/><div className={"value-holder-light-external"}>{value} lux</div></div>
    }

    let ret =
        <>
            {light_sensor}
            <div id="airtempexternal-holder">
                <RenderThermometer exists={props.station.thermometer_external}
                                   display_settings={props.display_settings}
                                   currentTemperature={props.sensor_readings.temp_air_external}
                                   units={props.display_settings.temperature_units}
                                   direction={props.sensor_readings.temp_air_external_direction}/>
            </div>
            <div id="humidityexternal-text-holder">
                <RenderHygrometer prefix={"external"}
                                  exists={props.station.humidity_sensor_external}
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
