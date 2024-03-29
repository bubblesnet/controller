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
import {Table, TableCell, TableRow} from "grommet";
import RenderDeviceSwitch from "./DeviceSwitchFunctional";
import Switch from "react-input-switch";
import log from "roarr";
// import log from "./bubbles_logger"

import RenderStageSelector from "../StageTabs/StageSelector";

// copyright and license inspection - no issues 4/13/22

var slideclick_valid = new Audio("slideclick_valid.mp3");

function goodbeep() {
    slideclick_valid.play()
}

function RenderSwitchPanel (props) {
    let automaticControlOn = props.switch_state.automaticControl.on
    let value_name = 'ON'
    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'
    let toggle_style = {
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
    }

    function setSelectedStage(x) {
        log.trace("setSelectedStage " + JSON.stringify(x))
        props.setCurrentStage(x)
    }

    function toggleAutomatic(e) {
        log.trace("toggleAutomatic ")
        goodbeep()
        props.switchControl.automaticControl.toggle(e)
    }

    if(!automaticControlOn)
        value_name = 'OFF'

    let ret = <>
            <Table ><tbody>
        <TableRow ><TableCell >Automatic Control</TableCell>
            <TableCell>
            <Switch onChange={toggleAutomatic} on="ON" off="OFF" value={value_name} styles={toggle_style} />
            </TableCell>
        </TableRow>

        <RenderDeviceSwitch exists={props.switch_state.humidifier} toggle={props.switchControl.humidifier.toggle} on="ON" off="OFF" onOff={props.switch_state.humidifier.on?"ON":"OFF"} label='Humidifier' automaticControl={value_name} changing={props.switch_state.humidifier.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.heater} toggle={props.switchControl.heater.toggle} on="ON" off="OFF" onOff={props.switch_state.heater.on?"ON":"OFF"} label='Heater' automaticControl={value_name} changing={props.switch_state.heater.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.intake_fan} toggle={props.switchControl.intakeFan.toggle} on="ON" off="OFF" onOff={props.switch_state.intakeFan.on?"ON":"OFF"} label='Intake Fan'  automaticControl={value_name} changing={props.switch_state.intakeFan.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.exhaust_fan} toggle={props.switchControl.exhaustFan.toggle} on="ON" off="OFF" onOff={props.switch_state.exhaustFan.on?"ON":"OFF"} label='Exhaust Fan'  automaticControl={value_name} changing={props.switch_state.exhaustFan.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.air_pump} toggle={props.switchControl.airPump.toggle} on="ON" off="OFF" onOff={props.switch_state.airPump.on?"ON":"OFF"} label='Air Pump'  automaticControl={value_name} changing={props.switch_state.airPump.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.water_pump} toggle={props.switchControl.waterPump.toggle} on="ON" off="OFF" onOff={props.switch_state.waterPump.on?"ON":"OFF"} label='Water Pump'  automaticControl={value_name} changing={props.switch_state.waterPump.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.light_bloom} toggle={props.switchControl.lightBloom.toggle} on="ON" off="OFF" onOff={props.switch_state.lightBloom.on?"ON":"OFF"} label='Growlight'  automaticControl={value_name} changing={props.switch_state.lightBloom.changing}/>
        <RenderDeviceSwitch exists={props.switch_state.water_heater} toggle={props.switchControl.waterHeater.toggle} on="ON" off="OFF" onOff={props.switch_state.waterHeater.on?"ON":"OFF"} label='Water Heater'  automaticControl={value_name} changing={props.switch_state.waterHeater.changing}/>

    </tbody></Table>
        <RenderStageSelector station={props.station}
                             display_settings={props.display_settings}
                             setSelectedStageFromChild={setSelectedStage}
                             automation_setting={{stage_name: props.station.current_stage}}
                              />
    </>

    return (ret)
}


export default RenderSwitchPanel;
