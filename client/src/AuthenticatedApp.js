import React, {useEffect, useState, useRef} from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderDisplaySettings from "./components/DisplaySettingsTab/DisplaySettingsTabFunctional"
import RenderSettings from "./components/CabinetSettingsTab/CabinetSettingsTabFunctional"
import RenderSetup from "./components/ApplicationSettingsTab/ApplicationSettingsTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'

function AuthenticatedApp (props) {

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function setCabinetSettingsStateFromChild(x) {
        let newstate = JSON.parse(JSON.stringify(state))
        newstate.cabinet_settings = JSON.parse(JSON.stringify(x.cabinet_settings))
        setState(newstate)
    }
    function setSwitchStateFromChild(x) {
        console.log("setSwitchStateFromChild should rerender Heater")
        state.switch_state = JSON.parse(JSON.stringify(x.switch_state))
        setState(JSON.parse(JSON.stringify(state)))
    }

    function resetChanges() {
        console.log("AuthenticatedApp resetchanges humidifier is "+state.cabinet_settings.humidifier)
        setState(state)
    }

//    console.log("AuthenticatedApp initial theme " + JSON.stringify(initial_theme))
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    const [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    const [language, setLanguage] = useState("all");
    const [bubbles_theme,setBubblesTheme] = useState(initial_theme);
    const [current_font,setCurrentFont] = useState(initial_theme.global.font.family)

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const[state, setState] = useState(initial_state);

    useEffect(() => {
        console.log("AuthenticatedApp useEffect")
        /*
        const timer = setTimeout(() => {
            console.log('timeout exhaustFan ' + state.switch_state.exhaustFan.on)
            let x = {...(state)}
            x.switch_state.exhaustFan.on = !state.switch_state.exhaustFan.on
            x.switch_state.intakeFan.on = !state.switch_state.intakeFan.on
            x.switch_state.heater.on = !state.switch_state.heater.on
            x.switch_state.humidifier.on = !state.switch_state.humidifier.on
            x.switch_state.airPump.on = !state.switch_state.airPump.on
            x.switch_state.waterPump.on = !state.switch_state.waterPump.on
            x.switch_state.growLight.on = !state.switch_state.growLight.on
            let direction = 'up'
            let increment = 1
            if (x.status.humidity_internal % 2 === 0) {
                direction = 'up'
                increment = 1
            } else {
                direction = 'down'
                increment = -1;
            }
            x.status.humidity_internal = x.status.humidity_internal + increment
            x.status.temp_air_external = x.status.temp_air_external + increment
            x.status.temp_water = x.status.temp_water + increment
            x.status.temp_air_bottom = x.status.temp_air_bottom + increment
            x.status.temp_air_middle = x.status.temp_air_middle + increment
            x.status.temp_air_top = x.status.temp_air_top + increment
            x.status.humidity_external = x.status.humidity_external + increment
            x.status.root_ph = x.status.root_ph + (.1 * increment)
            x.status.pressure_external = x.status.pressure_external + increment

            x.status.humidity_internal_direction = direction
            x.status.temp_air_external_direction = direction
            x.status.temp_water_direction = direction
            x.status.temp_air_bottom_direction = direction
            x.status.temp_air_middle_direction = direction
            x.status.temp_air_top_direction = direction
            x.status.humidity_external_direction = direction
            x.status.root_ph_direction = direction
            x.status.pressure_external_direction = direction

            setState(x)
//            setLoading(!loading)
            console.log("setting exhaustFan " + x.switch_state.exhaustFan.on)
            return () => clearTimeout(timer);
        }, 50000);
        */
        console.log("AuthenticatedApp useEffect call has")
    }, [state]);


    const applyFontChange = (value) => {
        let x = bubbles_theme;

        console.log("AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font)
        x.global.font.family = current_font;
        console.log("AuthenticatedApp should rerender to font " + x.global.font.family)
        setBubblesTheme(x)
    }

    const localFontChange = (value) => {
        console.log("AuthenticatedApp localFontChange from " + current_font + " to " + value)
        setCurrentFont(value)
    }

    let setLang = (value) => {
        console.log("AuthenticatedApp setting language to " + value)
        setLanguage(value)
    }

    let setEnvironment = (value) => {
        console.log("AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        let theApiPort;
        if (theNodeEnvironment === "production") {
            theApiPort = 3001;
        } else if (theNodeEnvironment === "test") {
            theApiPort = 3002;
        } else if (theNodeEnvironment === "development") {
            theApiPort = 3003;
        }
        console.log("setting state db to " + theNodeEnvironment + " port to " + theApiPort)
        setNodeEnv(theNodeEnvironment);
        setApiPort(theApiPort);
    }

    console.log("AuthenticatedApp Rendering App with humidifier = "+state.cabinet_settings.humidifier)
    let merged_theme = deepMerge(grommet,bubbles_theme)
    return (
         <div className="App">
            <Header setNodeEnv={setEnvironment}/>
            <Tabs margin="medium" flex="shrink" >
                <Tab title="Cabinet Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                      state={state} switch_state={state.switch_state} setStateFromChild={setSwitchStateFromChild}/>
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} state={state}/>
                </Tab>
                <Tab title="Cabinet Setup">
                    <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} state={state}
                    setStateFromChild={setCabinetSettingsStateFromChild}
                    />
                </Tab>
                <Tab title="Automation">
                    <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} state={state} />
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Display Settings">
                    <RenderDisplaySettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} state={state} onApplyFontChange={applyFontChange} onLocalFontChange={localFontChange} />
                </Tab>
                <Tab title="App Settings">
                    <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} onFontChange={applyFontChange} applicationSettings={state.application_settings}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp