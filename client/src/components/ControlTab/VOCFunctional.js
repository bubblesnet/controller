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

// copyright and license inspection - no issues 4/13/22

function RenderVOC (props) {
    let directionClassName=""
    let ret = <></>

    if(props.exists !== true ) {
        return( ret )
    }

    if(props.direction==="up") {
        directionClassName="vocarrowup-icon"
    }
    if(props.direction==="down") {
        directionClassName="vocarrowdown-icon"
    }
    let value = sprintf.sprintf("%.0f", props.value)
//    console.log("value rendering as " + value)
    ret = <>
        <div className={"value-holder-co2-voc"} >
            VOC {value} {props.units}
        </div>
        <div className={directionClassName} />
    </>

    return (ret);
}

export default RenderVOC;



