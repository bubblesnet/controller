import React, {useState} from 'react';

import RenderTestQueueListFunctional from "./components/TestQueueListFunctional";
import RenderTestRunListFunctional from "./components/TestRunListFunctional";
import RenderMetrics from "./components/ControlTab/MetricsPanelFunctional";
import RenderSBCEditor from "./components/SBCEditor";
import {Tabs, Tab} from "rendition";
import RenderDeviceStatusListFunctional from "./components/DeviceStatusListFunctional";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderOverviewTab from "./components/OverviewTab/OverviewTabFunctional";
import RenderEvents from "./components/EventsFunctional";


function AuthenticatedApp (props) {
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
                    <RenderOverviewTab nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Metrics">
                    <RenderMetrics nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Work Queue">
                    <RenderTestQueueListFunctional nodeEnv={nodeEnv} apiPort={apiPort} language={language}
                                                   onChangeLanguage={setLang}/>
                </Tab>
                <Tab title="Workers">
                    <RenderDeviceStatusListFunctional nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="Runs">
                    <RenderTestRunListFunctional nodeEnv={nodeEnv} apiPort={apiPort}/>
                </Tab>
                <Tab title="SBC Targets">
                    <RenderSBCEditor nodeEnv={nodeEnv} apiPort={apiPort} blah={"blahblah"}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp