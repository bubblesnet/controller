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


const io = require('socket.io-client');
const socket = io('http://localhost:3011');

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


    const[state, setState] = useState({
        display_settings: {
            units: 'METRIC',
            language: 'en-us',
            languageOptions:['en-us','fr'],
            theme: bubbles_theme,
            current_font: bubbles_theme.global.font.family,
            units_options: ["IMPERIAL","METRIC"],
            tub_volume_units: 'gallons',
            tub_depth_units: 'inches',
            plant_height_units: 'inches',
            humidity_units: '%',
            temperature_units: 'F',
            pressure_units: 'hPa',
            pressure_units_options: ['hPa', 'mbar', 'mm Hg', 'psi']
        },
        cabinet_settings: {
            humidifier: true,
            humidity_sensor: true,
            external_humidity_sensor: true,
            heater: true,
            thermometer_top: true,
            thermometer_middle: true,
            thermometer_bottom: true,
            external_thermometer: true,
            thermometer_water: true,
            water_pump: true,
            air_pump: true,
            light_sensor: true,
            cabinet_door_sensor: true,
            outer_door_sensor: true,
            movement_sensor: true,
            pressure_sensors: true,
            root_ph_sensor: true,
            enclosure_type: 'Cabinet',
            water_level_sensor: true,
            tub_depth: 18.0,
            tub_volume: 20.0,
            intake_fan: true,
            exhaust_fan: true,
            enclosure_options: ["Cabinet","Tent"],
            light_bloom: true,
            light_vegetative: true,
            light_germinate: true
        },
        automation_settings: {
            current_stage: 'Germinate',
            stage_options: ['Germinate','Vegetative','Bloom', 'Harvest', 'Dry', 'Idle'],
            current_lighting_schedule: '12 on/12 off',
            lighting_schedule_options: ['24 on','18 on/6 off','14 on/10 off','12 on/12 off','10 on/14 off', '6 on/18 off', '24 off'],
            light_on_start_hour: 10,
            target_temperature: 75,
            temperature_min: 60,
            temperature_max: 90,
            humidity_min: 0,
            humidity_max: 90,
            target_humidity: 70,
            humidity_target_range_low: 75,
            humidity_target_range_high: 85,
            current_light_type: 'Grow Light Veg',
            light_type_options: ['Germinate', 'Grow Light Veg','Grow Light Bloom']
        },
        status: {
            units: 'IMPERIAL',
            temp_air_external: 65,
            temp_air_external_direction: 'up',
            temp_air_top: 85,
            temp_air_top_direction: 'up',
            temp_air_middle: 80,
            temp_air_middle_direction: 'up',
            temp_air_bottom: 77,
            temp_air_bottom_direction: 'down',
            temp_water: 70,
            temp_water_direction: 'down',
            root_ph: 6.3,
            root_ph_direction: 'down',
            humidity_internal: 67,
            humidity_internal_direction: 'up',
            humidity_external: 43,
            humidity_external_direction: 'down',
            plant_height: 37,
            start_date_current_stage: '25 days ago',
            start_date_next_stage: '10 days from now',
            outer_door_open: false,
            cabinet_door_open: false,
            pressure_external: 1021,
            pressure_internal: 1018,
            date_last_training: 'never',
            date_last_filter_change: 'never',
            tub_water_level: 14.9
        },
        application_settings: {

        },
        switch_state: {
            automaticControl: {on: true},
            humidifier: {on: true},
            heater: { on: true},
            airPump: { on: true},
            waterPump: { on:  true},
            intakeFan: { on:  true},
            exhaustFan: { on:  true},
            currentGrowLight: { on:  false}

        }
    });

    useEffect(() => {
        console.log("AuthenticatedApp useEffect")
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