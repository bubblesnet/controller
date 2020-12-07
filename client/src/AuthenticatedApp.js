import React, {useEffect, useState} from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderDisplaySettings from "./components/DisplaySettingsTab/DisplaySettingsTabFunctional"
import RenderSettings from "./components/SettingsTab/SettingsTabFunctional"
import RenderSetup from "./components/SetupTab/SetupTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import initial_theme from './InitialTheme.json'


function AuthenticatedApp (props) {

    console.log("BubblesApp render props = " + JSON.stringify(props))
    let [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    let [language, setLanguage] = useState("all");
    let [bubbles_theme,setBubblesTheme] = useState(initial_theme);
    let [current_font,setCurrentFont] = useState(initial_theme.global.font.family)


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

    useEffect(() => {}, [bubbles_theme]);
    console.log("Rendering App with font "+bubbles_theme.global.font.family)
    return (
         <div className="App">
            <Header setNodeEnv={setEnvironment}/>
            <Tabs margin="medium" flex="shrink" >
                <Tab title="Cabinet Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Cabinet Setup">
                    <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Automation">
                    <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                </Tab>
                <Tab title="Display Settings">
                    <RenderDisplaySettings nodeEnv={nodeEnv} apiPort={apiPort} onApplyFontChange={applyFontChange} onLocalFontChange={localFontChange} theme={bubbles_theme} current_font={current_font}/>
                </Tab>
                <Tab title="App Settings">
                    <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} onFontChange={applyFontChange} theme={bubbles_theme}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp