import React, {useState} from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderSettings from "./components/SettingsTab/SettingsTabFunctional"
import RenderSetup from "./components/SetupTab/SetupTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import { useTheme } from 'rendition';

function AuthenticatedApp (props) {
    const theme = useTheme()

    console.log("BubblesApp render props = " + JSON.stringify(props))
    let [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    let [language, setLanguage] = useState("all")

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

    return (
        <div className="App">
            <Header setNodeEnv={setEnvironment}/>
            <Tabs margin="medium" flex="shrink" >
                <Tab title="Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Cabinet Settings">
                    <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Stage Settings">
                    <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="App Settings">
                    <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp