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
import './growbox.css';
import sprintf from 'sprintf-js';

// copyright and license inspection - no issues 4/13/22

function RenderHygrometer (props) {
//    console.log("RenderHygrometer humidity = " + props.currentHumidity)
    let holderid = props.prefix + "humidity-holder"
    let textid = props.prefix + "humiditytext-holder"
    let iconid = "externalhumidityicon-holder"
    let value = sprintf.sprintf("%2.1f", props.currentHumidity)
    let className = ""
    if (props.direction === "up") {
        className = sprintf.sprintf("externalarrowup-icon", props.prefix)
    }
    if (props.direction === "down") {
        className = sprintf.sprintf("externalarrowdown-icon", props.prefix)
    }

//    console.log("humidity rendering as " + value)
    let ret = <div id={holderid}>
         <div id={textid}>
             {value}
         </div>
         <div id={iconid}/>
        <div className={className}/>
        </div>

    if (props.exists === false) (
        ret = <></>
    )

    return (ret);
}

export default RenderHygrometer;



