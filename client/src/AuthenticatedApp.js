import React, {useEffect, useState} from 'react';

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


function AuthenticatedApp (props) {


    console.log("BubblesApp render props = " + JSON.stringify(props))
    let [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    let [language, setLanguage] = useState("all");
    let [bubbles_theme,setBubblesTheme] = useState(initial_theme);
    let [current_font,setCurrentFont] = useState(initial_theme.global.font.family)
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    let[state, setState] = useState({
        display_settings: {
            units: 'METRIC',
            language: 'en-us',
            languageOptions:['en-us','fr'],
            theme: bubbles_theme,
            current_font: bubbles_theme.global.font.family
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
            grow_light: true,
            water_pump: true,
            air_pump: true,
            light_sensor: true,
            cabinet_door_sensor: true,
            outer_door_sensor: true,
            movement_sensor: true,
            pressure_sensors: true,
            enclosure_type: 'Cabinet',
            tub_depth: 18.0,
            tub_depth_units: 'inches',
            tub_volume: 20.0,
            tub_volume_units: 'gallons',
            enclosure_options: ["Cabinet","Tent"],
            units_options: ["IMPERIAL","METRIC"]
        },
        automation_settings: {
            current_stage: 'Germinate',
            stage_options: ['Germinate','Vegetative','Bloom', 'Harvest', 'Dry', 'Idle'],
            current_lighting_schedule: '12 on/12 off',
            lighting_schedule_options: ['24 on','18 on/6 off','14 on/10 off','12 on/12 off','10 on/14 off', '6 on/18 off'],
            target_temperature: 75,
            target_temperature_units: 'F',
            temperature_min: 60,
            temperature_max: 90,
            humidity_min: 0,
            humidity_max: 90,
            target_humidity: 70,
            target_humidity_units: '%',

            current_light_type: 'Grow Light Veg',
            light_type_options: ['Germinate', 'Grow Light Veg','Grow Light Bloom']
        },
        status: {
            temperature_units: 'F',
            humidity_units: '%',
            units: 'IMPERIAL',
            temp_air_external: 65,
            temp_air_top: 85,
            temp_air_middle: 80,
            temp_air_bottom: 77,
            temp_water: 70,
            root_ph: 6.3,
            humidity_internal: 67,
            humidity_external: 43,
            plant_height: 37,
            plant_height_units: 'inches',
            start_date_current_stage: '25 days ago',
            start_date_next_stage: '10 days from now',
            outer_door_open: false,
            cabinet_door_open: false,
            pressure_external: 1021,
            pressure_internal: 1018,
            date_last_training: 'never',
            date_last_filter_change: 'never'
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
            growLight: { on:  true}

        }
    });

    useEffect(() => {}, [bubbles_theme]);

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
        const timer = setTimeout(() => setLoading(true), 120000);
        if (apiPort !== props.apiPort) {
            let x = state;
            setState(x)
            setLoading(false)
        }
        if (loading) {
            //           setValues({exhaustFanOn: !values.exhaustFanOn, intakeFanOn: !values.intakeFanOn})
            setLoading(false)
        }
        return () => clearTimeout(timer);
    }, [loading]);


    const applyFontChange = (value) => {
        let x = bubbles_theme;

        console.log("AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font)
//        if( value === '' ) {
//            return;
//        }
//        if( value !== x.global.font.family ) {
//            return;
//        }
        x.global.font.family = current_font;
        console.log("should rerender to font " + x.global.font.family)
        setBubblesTheme(x)
//        setCurrentFont(value)
    }

    const localFontChange = (value) => {
//        let x = bubbles_theme;
        console.log("AuthenticatedApp localFontChange from " + current_font + " to " + value)
//        x.current_font = value;
        console.log("should rerender to font " + value)
//        setBubblesTheme(value)
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

    console.log("Rendering App with font "+bubbles_theme.global.font.family)
    return (
         <div className="App">
            <Header setNodeEnv={setEnvironment}/>
            <Tabs margin="medium" flex="shrink" >
                <Tab title="Cabinet Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} switch_state={state.switch_state}/>
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} state={state}/>
                </Tab>
                <Tab title="Cabinet Setup">
                    <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} cabinet_settings={state.cabinet_settings}/>
                </Tab>
                <Tab title="Automation">
                    <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} automation_settings={state.automation_settings}/>
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Display Settings">
                    <RenderDisplaySettings nodeEnv={nodeEnv} apiPort={apiPort} onApplyFontChange={applyFontChange} onLocalFontChange={localFontChange} display_settings={state.display_settings}/>
                </Tab>
                <Tab title="App Settings">
                    <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} onFontChange={applyFontChange} theme={bubbles_theme} applicationSettings={state.application_settings}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp