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
import ReactSpeedometer from "react-d3-speedometer";
import sprintf from 'sprintf-js';

// copyright and license inspection - no issues 4/13/22

function RenderPhMeter (props) {

    let valueText = sprintf.sprintf( "%.1f", props.sensor_readings.root_ph )
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={props.sensor_readings.root_ph} minValue={4} maxValue={8}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['red','green','yellow']}
                    customSegmentStops={[4, 5.8, 6.2, 8]}
                    customSegmentLabels={[
                        {text: 'ACID', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: 'BASE', position: 'INSIDE', color: 'black'},
                    ]}
                    className={props.className}
                    />
            </div>
    if( props.exists === false ) {
        ret = <></>
    }

    return (ret)
}

export default RenderPhMeter;
