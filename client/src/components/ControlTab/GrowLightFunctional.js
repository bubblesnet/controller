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

import React from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderLightMeter from "./LightMeterFunctional";
import RenderBarometer from "./BarometerFunctional";
import RenderCO2 from "./CO2Functional";
import RenderVOC from "./VOCFunctional";

// copyright and license inspection - no issues 4/13/22

function RenderGrowLight (props) {
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="co2-holder">
                        <RenderCO2 exists={props.station.co2_sensor}
                                         textClassName={"co2-text-holder"}
                                         iconClassName={"co2-icon-holder"}
                                         value={props.sensor_readings.co2}
                                         units={props.display_settings.co2_units}
                                         direction={props.sensor_readings.co2_direction} />
                    </div>
                    <div className="voc-holder">
                        <RenderVOC exists={props.station.voc_sensor}
                                         textClassName={"voc-text-holder"}
                                         iconClassName={"voc-icon-holder"}
                                         value={props.sensor_readings.voc}
                                         units={props.display_settings.voc_units}
                                         direction={props.sensor_readings.voc_direction} />
                    </div>
                    <div className="pressure-holder">
                        <RenderBarometer exists={props.station.pressure_sensors}
                                         textClassName={"pressure-text-holder"}
                                         iconClassName={"pressure-icon-holder"}
                                         value={props.sensor_readings.pressure_internal}
                                         units={props.display_settings.pressure_units}
                                         direction={props.sensor_readings.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                        className={"light-text-holder"}
                        iconClassName={"light-icon-holder"}
                        exists={props.station.pressure_sensors}
                        value={props.sensor_readings.light_internal}
                        units={props.display_settings.light_units}
                        direction={props.sensor_readings.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.station.thermometer_top}
                                               currentTemperature={props.sensor_readings.temp_air_top}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.station.thermometer_middle}
                                               currentTemperature={props.sensor_readings.temp_air_middle}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_middle_direction}/>
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.station.thermometer_bottom}
                                               currentTemperature={props.sensor_readings.temp_air_bottom}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_bottom_direction}/>
                        </div>
                    </div>
                        <RenderHygrometer prefix={""} exists={props.station.humidity_sensor_internal}
                                          currentHumidity={props.sensor_readings.humidity_internal}
                                          units={props.display_settings.humidity_units} direction={props.sensor_readings.humidity_internal_direction}/>
                </div>
        } else {
            ret =
                <div className="growlight-container-on">
                    <div className="pressure-holder">
                    <RenderBarometer exists={props.station.pressure_sensors}
                                     textClassName={"pressure-text-holder"}
                                     iconClassName={"pressure-icon-holder"}
                                     value={props.sensor_readings.pressure_internal}
                                     units={props.display_settings.pressure_units}
                                     direction={props.sensor_readings.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                            className={"light-text-holder"}
                            iconClassName={"light-icon-holder"}
                            exists={props.station.pressure_sensors}
                            value={props.sensor_readings.light_internal}
                            units={props.display_settings.light_units}
                            direction={props.sensor_readings.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-on" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-day" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.station.thermometer_top}
                                               currentTemperature={props.sensor_readings.temp_air_top}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.station.thermometer_middle}
                                               currentTemperature={props.sensor_readings.temp_air_middle}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_middle_direction} />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.station.thermometer_bottom}
                                               currentTemperature={props.sensor_readings.temp_air_bottom}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_bottom_direction} />
                        </div>
                    </div>
                    <RenderHygrometer prefix={""} exists={props.station.humidity_sensor_internal}
                                      currentHumidity={props.sensor_readings.humidity_internal}
                                      units={props.display_settings.humidity_units} direction={props.sensor_readings.humidity_internal_direction}/>
                </div>
        }
    return (ret)
}

export default RenderGrowLight;



