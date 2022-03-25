import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet,Box, Grid} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderTemperatureSelector from './TemperatureSelectorFunctional'
import RenderHumiditySelector from './HumiditySelectorFunctional'
import RenderStageSelector from './StageSelector'
import RenderFormActions from '../FormActions'
import GoogleFontLoader from "react-google-font-loader";

function RenderStageTab (props) {

    console.log("RenderStageTab props.station.automation_settings = " + JSON.stringify(props.station.automation_settings))

    function setStateFromChild(x) {
        setapplyButtonState(true)
        setresetButtonState(true)
        setState(JSON.parse(JSON.stringify(x)))
    }

    function applyAction() {
        setapplyButtonState(false)
        setresetButtonState(false)
        console.log("StageTabsettingstage " + state.automation_settings.current_stage)
        props.setStateFromChild(state.automation_settings.current_stage);
    }

    function resetAction() {
        setState(JSON.parse(JSON.stringify(props.state)));
    }

    function defaultsAction() {
        setState(JSON.parse(JSON.stringify(props.state)));
    }

//    const initialRange = [77, 81]
//    const [range, setRange] = useState(initialRange);
//    const RANGE_MIN = 60;
//    const RANGE_MAX =90;

//    const label = 'Target Temperature Range'

    let [state, setState] = useState(props.state); //
    let [settings, setSettings] = useState(props.settings); //
    let [applyButtonState, setapplyButtonState] = useState(false); //
    let [resetButtonState, setresetButtonState] = useState(false); //
    let [defaultsButtonState, setdefaultsButtonState] = useState(true ); //

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
                            { name: 'actions', start: [0, 4], end: [0, 4] },
                        ]}
                        columns={['large']}
                        rows={['60px','xsmall','130px','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'stage'} >
                            <RenderStageSelector station={props.station}
                                                 display_settings={props.display_settings}
                                                 settings={settings} state={state} setStateFromChild={setStateFromChild}/>
                        </Box>
                        <Box gridArea={'light'}  >
                            <RenderLightSelector station={props.station}
                                                 display_settings={props.display_settings}
                                                 settings={settings} state={state} setStateFromChild={setStateFromChild} />
                        </Box>
                        <Box gridArea={'temp'} >
                            <RenderTemperatureSelector station={props.station}
                                                       display_settings={props.display_settings}
                                                       settings={settings} state={state} label={"Target Temperature"} setStateFromChild={setStateFromChild}/>
                        </Box>
                        <Box gridArea={'humidity'} >
                            <RenderHumiditySelector station={props.station}
                                                    display_settings={props.display_settings}
                                                    settings={settings} state={state} label={"Target Humidity"} setStateFromChild={setStateFromChild}/>
                        </Box>
                        <Box gridArea={'actions'}   >
                            <RenderFormActions settings={settings} applyAction={applyAction} applyButtonState={applyButtonState} resetButtonState={resetButtonState} defaultsButtonState={defaultsButtonState} resetAction={resetAction} defaultsAction={defaultsAction}/>
                        </Box>
                    </Grid>
                    </div>
                </div>

            </Grommet>
    return (ret)
}

export default RenderStageTab;
