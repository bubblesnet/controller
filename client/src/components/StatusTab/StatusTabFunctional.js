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
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet} from 'grommet'
import RenderTemperatureMeter from "./TemperatureMeterFunctional";
import RenderHumidityMeter from "./HumidityMeterFunctional";
import RenderPressureMeter from "./PressureMeterFunctional";
import RenderPhMeter from "./PhMeterFunctional";
import RenderTextStatus from "./TextStatusFunctional";
import GoogleFontLoader from "react-google-font-loader";

// copyright and license inspection - no issues 4/13/22

function RenderStatusTab (props) {

    let ret = ""

        ret =
            <Grommet theme={props.theme}>
                <GoogleFontLoader
                    fonts={[
                        {
                            font: props.theme.global.font.family
                        },
                    ]}
                />
                <div className="global_container_">
                    <div className="meter-group">
                        <RenderTemperatureMeter
                                                sensor_readings={props.sensor_readings}
                                                station_settings={props.station}
                                                display_settings={props.display_settings}
                                                automation_settings={props.station.automation_settings}
                                                exists={props.station.temp_air_middle}
                                                className="temp-top" label="Air Temperature"
                                                />
                        <RenderHumidityMeter
                                             sensor_readings={props.sensor_readings}
                                             display_settings={props.display_settings}
                                             automation_settings={props.station.automation_settings}
                                             exists={props.station.humidity_sensor_internal}
                                             className="temp-middle" label="Humidity"
                                             />
                        <RenderPressureMeter
                                             sensor_readings={props.sensor_readings}
                                             display_settings={props.display_settings}
                                             exists={props.station.pressure_sensors}
                                             className="temp-bottom" label="Odor Control (pressure)"
                                             />
                        <RenderPhMeter
                                       sensor_readings={props.sensor_readings}
                                       exists={props.station.root_ph_sensor}
                                       className="temp-middle" label="Root pH"
                                       />
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus
                            sensor_readings={props.sensor_readings}
                            station={props.station}
                            automation_settings={props.station.automation_settings}
                            display_settings={props.display_settings}
                            settings={props.station}
                            state={props.state}
                            various_dates={props.various_dates}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderStatusTab;
