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
import sprintf from 'sprintf-js';

import ReactSpeedometer from "react-d3-speedometer";

// copyright and license inspection - no issues 4/13/22

function RenderHumidityMeter (props) {
    let valueText = sprintf.sprintf("%.1f%s", props.sensor_readings.humidity_internal, props.display_settings.humidity_units)
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={props.sensor_readings.humidity_internal} maxValue={props.automation_settings.humidity_max}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[props.automation_settings.humidity_min, props.automation_settings.humidity_target_range_low, props.automation_settings.humidity_target_range_high, props.automation_settings.humidity_max]}
                    customSegmentLabels={[
                        {text: 'TOO DRY', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: '', position: 'INSIDE', color: 'white'},
                    ]}
                    className={props.className}
                />
        </div>

    if( props.exists === false ) {
        ret = <></>
    }

return (ret)
}

export default RenderHumidityMeter;
