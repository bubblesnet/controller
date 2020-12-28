import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

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

import useWebSocket, { ReadyState } from 'react-use-websocket';

function AuthenticatedApp (props) {

    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
    const messageHistory = useRef([]);

    const {
//        sendMessage,
//        lastMessage,
        sendJsonMessage,
        lastJsonMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('websocket opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => setState(JSON.parse(event.data)),
    });

    messageHistory.current = useMemo(() =>
        messageHistory.current.concat(lastJsonMessage),[lastJsonMessage]);

    const handleClickChangeSocketUrl = useCallback(() =>
        setSocketUrl('wss://demos.kaazing.com/echo'), []);

    const sendit = () => {
        let msg='Hello '+getRandomInt(100)
        console.log("sending "+msg);
        initial_state.status.humidity_internal = 69+getRandomInt(10)
        sendJsonMessage(initial_state);
    }
    const handleClickSendMessage = useCallback(() =>
        sendit(), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

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

    console.log("AuthenticatedApp Rendering App with readyState = "+readyState)
    let merged_theme = deepMerge(grommet,bubbles_theme)
    let thestate = state
    if(lastJsonMessage) {
        console.log("lastjsonmessage = " + JSON.stringify(lastJsonMessage))
        thestate = JSON.parse(JSON.stringify(lastJsonMessage))
    }
    console.log("authenticatedapp humidity = " + thestate.status.humidity_internal)
    return (
         <div className="App">
            <Header setNodeEnv={setEnvironment}/>
             <button
                 onClick={handleClickSendMessage}
                 disabled={readyState !== ReadyState.OPEN}
             >
                 Click Me to send 'Hello'
             </button>

             <Tabs margin="medium" flex="shrink" >
                <Tab title="Cabinet Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                      state={thestate} switch_state={state.switch_state} setStateFromChild={setSwitchStateFromChild}/>
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