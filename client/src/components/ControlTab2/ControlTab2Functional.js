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
import './growbox.css'

import RenderGrowBox from "./GrowBoxFunctional";
import RenderIntakeFan from "./IntakeFanFunctional";
import RenderHeater from "./HeaterFunctional";
import RenderHumidifier from "./HumidifierFunctional";
import RenderSwitchPanel from "./SwitchPanelFunctional";
import {Grommet} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderControlTab2(props) {

    let switchControl = {
        automaticControl: {toggle: toggleAutomatic},
        humidifier: {changing: false, toggle: toggleHumidifier},
        heater: {changing: false, toggle: toggleHeater},
        heatingPad: {changing: false, toggle: toggleHeatingPad},
        intakeFan: {changing: false, toggle: toggleIntakeFan},
        heatLamp: {changing: false, toggle: toggleNotImplemented},
        waterHeater: {changing: false, toggle: toggleNotImplemented},
        lightBloom: {changing: false, toggle: toggleNotImplemented},
        lightVegetative: {changing: false, toggle: toggleNotImplemented},
        airPump: {changing: false, toggle: toggleNotImplemented},
        waterPump: {changing: false, toggle: toggleNotImplemented},
        exhaustFan: {changing: false, toggle: toggleNotImplemented},
        currentGrowLight: {changing: false, toggle: toggleNotImplemented}
    }

    function toggleNotImplemented() {

    }

    /***
     *
    function toggleState() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.changingState.on = !values.switchControl.changingState.on;
        props.setStateFromChild(x, "changingState", x.changingState.on)
    }
     */

    function toggleAutomatic() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.automaticControl.on = !props.switch_state.automaticControl.on;
        log.trace("toggleAutomatic from " + props.switch_state.automaticControl.on + " to " + x.automaticControl.on)
        props.setStateFromChild(x, "automaticControl", x.automaticControl.on)
    }

    function toggleHumidifier() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.humidifier.on = !props.switch_state.humidifier.on;
        props.setStateFromChild(x,"humidifier",x.humidifier.on)
    }

    function toggleHeatingPad() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.heatingPad.on = !props.switch_state.heatingPad.on;
        props.setStateFromChild(x,"heatingPad",x.heatingPad.on)
    }


    function toggleHeater() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.heater.on = !props.switch_state.heater.on;
        props.setStateFromChild(x,"heater",x.heater.on)
    }

    function toggleIntakeFan() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.intakeFan.on = !props.switch_state.intakeFan.on;
        props.setStateFromChild(x,"intakeFan",x.intakeFan.on)
    }

    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: props.theme.global.font.family
                    },
                ]}
            />

            <div className="global_container_">
                <div id="growboxgroup">
                    <div id="station">
                    </div>
                    <RenderGrowBox
                        station={props.station}
                        sensor_readings = {props.sensor_readings}
                        display_settings={props.display_settings}
                        exists={props.station.light_vegetative || props.station.light_bloom || props.station.light_germinate}
                        on={props.switch_state.lightBloom.on || props.switch_state.lightVegetative.on}
                    />
                    <RenderHeater exists={props.station.heater} on={props.switch_state.heater.on}/>
                    <RenderHumidifier exists={props.station.humidifier} on={props.switch_state.humidifier.on}/>
                    <div className="fans">
                        <div className="input-fan-holder">
                            <RenderIntakeFan exists={props.station.intake_fan} on={props.switch_state.intakeFan.on}/>
                        </div>
                    </div>
                </div>
                <div id="box-holder">
                    <div id="boxtop">
                    </div>
                    <div id="growbag1-holder">
                        <div id="growbag" />
                    </div>
                    <div id="growbag2-holder">
                        <div id="growbag" />
                    </div>
                    <div id="growbag3-holder">
                        <div id="growbag" />
                    </div>
                    <div id="growbag4-holder">
                        <div id="growbag" />
                    </div>
                    <div id="growbag5-holder">
                        <div id="growbag" />
                    </div>
                </div>
                <div id="switchpanel-buttongroup">
                    <RenderSwitchPanel display_settings={props.display_settings}
                                       station={props.station}
                                       switch_state={props.switch_state}
                                       switchControl={switchControl}
                                       automation_setting={props.station}
                                       setCurrentStage={props.setCurrentStage}
                    />
                </div>
            </div>
        </Grommet>
    return (ret)
}

export default RenderControlTab2;
