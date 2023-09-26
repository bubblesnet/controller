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
import Switch from "react-input-switch";
import {TableRow,TableCell} from "grommet";
import './controlTab.css'

// copyright and license inspection - no issues 4/13/22

var slideclick_valid = new Audio("slideclick_valid.mp3");
var slideclick_invalid = new Audio("slideclick_invalid.mp3");

function goodbeep() {
    slideclick_valid.play()
}
function badbeep() {
    slideclick_invalid.play()
}
function RenderDeviceSwitch (props) {
    function toggle(e) {
        console.log("changing = " + props.changing)
        if (props.automaticControl === props.off && props.changing === false) {
            props.toggle(e)
            goodbeep();
        } else {
            console.log("changing = " + props.changing + " automaticControl = " + props.automaticControl)
            badbeep();
        }
    }

    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'

    if (props.changing === true && props.automaticControl === props.off) {
        trackBackgroundColor = 'grey'
        trackCheckedColor = 'grey'
        buttonBackgroundColor = 'darkgrey'
        buttonCheckedColor = 'darkgrey'
    } else if (props.automaticControl === props.on) {
        trackBackgroundColor = 'red'
        trackCheckedColor = 'green'
        buttonBackgroundColor = 'red'
        buttonCheckedColor = 'green'
    }

    let ret

    if (props.exists === false) {
        ret = <></>
    } else {
        ret =
            <TableRow><TableCell>{props.label}</TableCell><TableCell>
                <Switch on={props.on} off={props.off} value={props.onOff}
                        styles={{
                            track: {
                                backgroundColor: trackBackgroundColor
                            },
                            trackChecked: {
                                backgroundColor: trackCheckedColor
                            },
                            button: {
                                backgroundColor: buttonBackgroundColor
                            },
                            buttonChecked: {
                                backgroundColor: buttonCheckedColor
                            }
                        }} onChange={toggle}/>
            </TableCell></TableRow>
    }
    return (ret)
}

export default RenderDeviceSwitch;
