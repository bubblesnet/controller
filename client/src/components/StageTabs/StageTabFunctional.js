import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet,Box, Grid} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderWaterTemperatureSelector from './WaterTemperatureSelectorFunctional'
import RenderTemperatureSelector from './TemperatureSelectorFunctional'
import RenderHumiditySelector from './HumiditySelectorFunctional'
import RenderStageSelector from './StageSelector'
import RenderFormActions from '../FormActions'
import GoogleFontLoader from "react-google-font-loader";
import log from "roarr";

function RenderStageTab (props) {

    log.trace("RenderStageTab props.station.automation_settings = " + JSON.stringify(props.station.automation_settings))

    function setAutomationSettingsFromChild(x) {
        setapplyButtonState(true)
        setresetButtonState(true)
//        log.info("setAutomationSettingsFromChild "+JSON.stringify(x))
        setStation(JSON.parse(JSON.stringify(x)))
    }

    function applyAction() {
        setapplyButtonState(false)
        setresetButtonState(false)
        log.trace("StageTab automation_settings " + station.current_stage)
        props.setStageFromChild(station.current_stage);
        props.setAutomationSettingsFromChild(station.automation_settings)
    }

    function resetAction() {
        setStation(JSON.parse(JSON.stringify(props.station)));
    }

    function defaultsAction() {
        setStation(JSON.parse(JSON.stringify(props.station)));
    }

    let [station, setStation] = useState(props.station); //
    let [applyButtonState, setapplyButtonState] = useState(false); //
    let [resetButtonState, setresetButtonState] = useState(false); //
    let [defaultsButtonState] = useState(true ); //

    console.log("rendering with stage={"+station.current_stage+"}")
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
                        rows={['60px','xsmall','130px','130px','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'stage'} >
                            <RenderStageSelector station={station}
                                                 display_settings={props.display_settings}
                                                 settings={station}
                                                 setStateFromChild={setAutomationSettingsFromChild}/>
                        </Box>
                        <Box gridArea={'light'}  >
                            <RenderLightSelector station={station}
                                                 display_settings={props.display_settings}
                                                 settings={station}
                                                 setStateFromChild={setAutomationSettingsFromChild} />
                        </Box>
                        <Box gridArea={'temp'} >
                            <RenderTemperatureSelector station={station}
                                                       display_settings={props.display_settings}
                                                       settings={station}
                                                       label={"Target Temperature"}
                                                       setStateFromChild={setAutomationSettingsFromChild}/>
                        </Box>
                        <Box gridArea={'humidity'} >
                            <RenderHumiditySelector station={station}
                                                    display_settings={props.display_settings}
                                                    settings={station} label={"Target Humidity"}
                                                    setStateFromChild={setAutomationSettingsFromChild}/>
                        </Box>
                        <Box gridArea={'watertemp'} >
                            <RenderWaterTemperatureSelector station={station}
                                                            display_settings={props.display_settings}
                                                            settings={station}
                                                            label={"Water Temperature"}
                                                            setStateFromChild={setAutomationSettingsFromChild}/>
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
