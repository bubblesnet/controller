import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
//import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'

function SetupApp (props) {

    //Public API that will echo messages sent to it back to the client
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    const [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const [local_state, setState] = useState(initial_state);

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

    console.log("SetupApp Rendering App with readyState = " + readyState)
    let thestate = local_state
    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment}/>
                <Tabs margin="medium" flex="shrink">
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                </Tabs>
        </div>
    );
}

export default SetupApp