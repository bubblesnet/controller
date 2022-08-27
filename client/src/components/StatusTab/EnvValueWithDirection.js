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

import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import sprintf from 'sprintf-js'
import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function RenderEnvValueWithDirection (props) {
    log.info("RenderEnvValueWithDirection "+ props.label +" units = " + props.units)

    let ret =''
    let label_area= `${props.gridArea}-label`
    let value_area= `${props.gridArea}-value`
    let direction_area= `${props.gridArea}-direction`
    if( props.exists !== true ) {
        ret = <>
            <Box gridArea={label_area}>{props.label}</Box>
            <Box gridArea={value_area} />
            <Box gridArea={direction_area} />
        </>
    } else {
        let className = ''
        if(props.direction === 'up') {
            className='zero-arrowup-icon'
        }
        if(props.direction === 'down') {
            className='zero-arrowdown-icon'
        }
        let valuestr = sprintf.sprintf( "%.1f %s", props.value, props.units )

        ret = <>
            <Box gridArea={label_area}>{props.label}</Box>
            <Box gridArea={value_area}>{valuestr}</Box>
            <Box gridArea={direction_area}>
                <div className={className}/>
            </Box>
        </>
    }
    return( ret )
}
export default RenderEnvValueWithDirection;