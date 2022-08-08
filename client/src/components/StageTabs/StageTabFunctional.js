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

import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, Box, Grid, CheckBox} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderWaterTemperatureSelector from './WaterTemperatureSelectorFunctional'
import RenderAirTemperatureSelector from './AirTemperatureSelectorFunctional'
import RenderHumiditySelector from './HumiditySelectorFunctional'
import RenderStageSelector from './StageSelector'
import RenderFormActions from '../FormActions'
import GoogleFontLoader from "react-google-font-loader";
import log from "roarr";
import {getStage,getAutomationSetting, getSite} from "../../api/utils";
import util from "../../util";

// copyright and license inspection - no issues 4/13/22

function RenderStageTab (props) {

    log.trace("RenderStageTab props.automation_setting = " + JSON.stringify(getAutomationSetting(props.automation_settings, props.selected_stage)))

    let [checked, setChecked] = useState(false);
    let [selected_stage, setSelectedStage] = useState(props.selected_stage);
    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    useEffect(() => {
        const fetchData = async () => {
            log.trace("selected StageTab stage value fetching")
            let z = await getStage(servers.api_server_host, servers.api_server_port, props.station.stationid, selected_stage)
            log.trace("setting automation setting after fetch to " + JSON.stringify(z))
            setAutomationSetting(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    },[selected_stage]);    // eslint-disable-line react-hooks/exhaustive-deps
    // ONLY CALL ON MOUNT - empty array arg causes this

    function setAutomationSettingFromChild(x) {
        setapplyButtonState(true)
        setresetButtonState(true)
        log.trace("setAutomationSettingFromChild "+JSON.stringify(x))
        setAutomationSetting(JSON.parse(JSON.stringify(x)))
    }

//    function setSelectedStage(value) {
//        log.info("selected stage value stageTab new stage value " + value)
//    }

    function applyAction() {
        setapplyButtonState(false)
        setresetButtonState(false)
        log.trace("StageTab automation_settings " + station.current_stage)
        if( checked ) {
            props.setStageFromChild(station.current_stage);
            props.setAutomationSettingsFromChild(station.automation_settings)
        }
        props.updateStageFromChild(station.current_stage,station.automation_settings)
    }

    function setCurrent( e ) {
        log.trace("e.getchecked = " + e.target.checked)
        setapplyButtonState(true)
        setresetButtonState(true)
        setChecked(e.target.checked)
    }

    function resetAction() {
        setStation(JSON.parse(JSON.stringify(props.station)));
    }

    function defaultsAction() {
        setStation(JSON.parse(JSON.stringify(props.station)));
    }

    let [station, setStation] = useState(props.station); //
    let [automation_setting, setAutomationSetting] = useState(getAutomationSetting(props.automation_settings, selected_stage))
    let [applyButtonState, setapplyButtonState] = useState(false); //
    let [resetButtonState, setresetButtonState] = useState(false); //
    let [defaultsButtonState] = useState(true ); //

    log.trace("rendering with automation_setting="+JSON.stringify(automation_setting))
    let ret =
            <Grommet theme={props.theme}>
                <GoogleFontLoader
                    fonts={[
                        {
                            font: props.theme.global.font.family
                        },
                    ]}
                />
                <div className="global_container_" >
                    <div className={'settings-tab'} >
                    <Grid className={'centered-thead-text'} id={'stages-tab'}
                          justify={'center'}
                        round={'small'}
                        direction={'vertical'}
                        fill
                        areas={[
                            { name: 'stage', start: [0, 0], end: [0, 0] },
                            { name: 'light', start: [0, 1], end: [0, 1] },
                            { name: 'temp', start: [0, 2], end: [0, 2] },
                            { name: 'humidity', start: [0, 3], end: [0, 3] },
                            { name: 'watertemp', start: [0, 4], end: [0, 4] },
                            { name: 'actions', start: [0, 5], end: [0, 5] },
                        ]}
                        columns={['large']}
                        rows={['xsmall','xsmall','130px','130px','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'stage'} >
                            <table><tbody><tr><td>
                            <RenderStageSelector station={station}
                                                 display_settings={props.display_settings}
                                                 automation_setting={automation_setting}
                                                 setSelectedStageFromChild={setSelectedStage}
                                                 selectedStage={automation_setting.stage_name} />
                            </td></tr></tbody></table>
                            </Box>
                        <Box gridArea={'light'}  >
                            <RenderLightSelector station={station}
                                                 display_settings={props.display_settings}
                                                 settings={station}
                                                 automation_setting={automation_setting}
                                                 setAutomationSettingFromChild={setAutomationSettingFromChild} />
                        </Box>
                        <Box gridArea={'temp'} >
                            <RenderAirTemperatureSelector station={station}
                                                          display_settings={props.display_settings}
                                                          automation_setting={automation_setting}
                                                          label={"Target Air Temp"}
                                                          setAutomationSettingFromChild={setAutomationSettingFromChild}/>
                        </Box>
                        <Box gridArea={'humidity'} >
                            <RenderHumiditySelector station={station}
                                                    display_settings={props.display_settings}
                                                    automation_setting={automation_setting}
                                                    label={"Target Humidity"}
                                                    setAutomationSettingFromChild={setAutomationSettingFromChild}/>
                        </Box>
                        <Box gridArea={'watertemp'} >
                            <RenderWaterTemperatureSelector station={station}
                                                            display_settings={props.display_settings}
                                                            automation_setting={automation_setting}
                                                            label={"Target Water Temp"}
                                                            setAutomationSettingFromChild={setAutomationSettingFromChild}/>
                        </Box>
                        <Box gridArea={'actions'}   >
                            <RenderFormActions settings={station}
                                               applyAction={applyAction}
                                               applyButtonState={applyButtonState}
                                               resetButtonState={resetButtonState}
                                               defaultsButtonState={defaultsButtonState}
                                               resetAction={resetAction}
                                               defaultsAction={defaultsAction}/>
                        </Box>
                    </Grid>
                    </div>
                </div>

            </Grommet>
    return (ret)
}

export default RenderStageTab;
