import React, { useState, useCallback, useMemo, useRef } from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderDisplaySettings from "./components/DisplaySettingsTab/DisplaySettingsTabFunctional"
import RenderSettings from "./components/CabinetSettingsTab/CabinetSettingsTabFunctional"
import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
import RenderDeviceMap from "./components/DeviceMapTab/DeviceMapTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
// import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'
import initial_settings from './initial_settings.json'

import useWebSocket from 'react-use-websocket';

function AuthenticatedApp (props) {
    console.log("props = " + JSON.stringify(props))

    let websocket_server_port = 0;
    let api_server_port = 0;
    switch( props.nodeEnv) {
        case "DEV":
            api_server_port = 3003;
            websocket_server_port = 8001;
            break;
        case "TEST":
            api_server_port = 3002;
            websocket_server_port = 8002;
            break;
        case "PRODUCTION":
            api_server_port = 3001;
            websocket_server_port = 8003;
            break;
        case "CI":
            api_server_port = 3004;
            websocket_server_port = 8004;
            break;
    }

    //Public API that will echo messages sent to it back to the client
//    const [apiConnected, setApiConnected] = useState(0);
    const [language, setLanguage] = useState('');
    const [socketUrl, setSocketUrl] = useState('ws://localhost:'+websocket_server_port);
    const messageHistory = useRef([]);
    let lastCompleteStatusMessage

    const processMeasurementMessage = (message) => {
        console.log("processMeasurementMessage "+JSON.stringify(message))
        /*
        "message_type": "measurement",
            "measurement_type": "temperature",
            "sample_timestamp": "105050987",
            "sensor_name": "thermometer_top",
            "value":  "27.3",
            "units": "C"
         */
        applyMeasurementToState(message)
    }

    const applyMeasurementToState = (msg) => {
        console.log(JSON.stringify(msg))
        if( typeof msg.value === 'undefined' ) {
            console.log("BAD measurement message " + JSON.stringify(msg))
        } else {
            local_state.status[msg.measurement_name] = msg.value
            local_state.status[msg.measurement_name + "_direction"] = msg.direction
//        console.log( "direction!!! local_state.status["+msg.measurement_name+"_direction"+"] = " + msg.direction )
            console.log("Applying " + msg.value + " " + local_state.status[msg.measurement_name + "_direction"] + " to " + msg.measurement_name)
        }
    }

    const handleWebSocketMessage = ( event ) => {
        console.log("handling websocket message " + JSON.stringify(event.data))
        let msg = JSON.parse(event.data)
        if( typeof(msg.status) === 'undefined' || msg.status === null ) {
            if( typeof(msg.message_type) === 'undefined' || msg.message_type === null ) {
                console.log("Received invalid message " + event.data)
            } else {
                console.log("received message type "+msg.message_type);
                switch (msg.message_type) {
                    case "measurement":
                        console.log("received measurement");
                        applyMeasurementToState(msg)
                        break;
                    case "event":
                        console.log("received event");
                        break;
                    default:
                        console.log("unknown message type " + msg.message_type)
                        break;
                }
            }
        } else {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHH   Received valid status message")
//            setState(JSON.parse(event.data));
        }
    }
    const {
        sendJsonMessage,
        lastJsonMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        reconnectAttempts: 1000000,
        reconnectInterval: 30000,
        onOpen: () => console.log('websocket opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => handleWebSocketMessage(event), // This relies on receiving a "state" object from the server
    });

    messageHistory.current = useMemo(() =>
        messageHistory.current.concat(lastJsonMessage), [lastJsonMessage]);


    const sendit = () => {
        let x = JSON.parse(JSON.stringify(local_state))
        if (lastJsonMessage) {
            x = JSON.parse(JSON.stringify(lastJsonMessage))
        }
        x.status.humidity_internal = 69 + getRandomInt(10)
        sendJsonMessage(x);
    }
    const handleClickSendMessage = useCallback(() =>
        sendit(), []);

/*    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

 */

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function setCabinetSettingsStateFromChild(x) {
        let newstate = JSON.parse(JSON.stringify(local_state))
        newstate.cabinet_settings = JSON.parse(JSON.stringify(x.cabinet_settings))
        setState(newstate)
    }

    function setSwitchStateFromChild(x) {
        console.log("setSwitchStateFromChild should rerender Heater to " + x.switch_state.heater.on)
        local_state.switch_state = JSON.parse(JSON.stringify(x.switch_state))
        sendJsonMessage(local_state); // This call causes a message to get reflected back to us that tells us the switch state has changed and rerender.
    }

    function setAutomationStateFromChild(x) {
        console.log("setSwitchStateFromChild should rerender Heater to " + x.switch_state.heater.on)
        local_state.automation_settings = JSON.parse(JSON.stringify(x.automation_settings))
        sendJsonMessage(local_state); // This call causes a message to get reflected back to us that tells us the switch state has changed and rerender.
    }

//    console.log("AuthenticatedApp initial theme " + JSON.stringify(initial_theme))
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    const [apiPort, setApiPort] = useState(api_server_port);  // The port we should send queries to - depends on dev/test/prod
//    const [language, setLanguage] = useState("all");
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    const [current_font, setCurrentFont] = useState(initial_theme.global.font.family)

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const [local_state, setState] = useState(initial_state);
    const [local_settings, setSettings] = useState(initial_settings);

    const applyMapChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        console.log("AuthenticatedApp applyMapChange");
    }

    const applyFontChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        console.log("AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font + " value " + value )
        x.global.font.family = current_font;
        console.log("AuthenticatedApp should rerender to font " + x.global.font.family)
        setBubblesTheme(x)
    }

    const localFontChange = (value) => {
        console.log("AuthenticatedApp localFontChange from " + current_font + " to " + value)
        setCurrentFont(value)
    }

 /*   let setLang = (value) => {
        console.log("AuthenticatedApp setting language to " + value)
        setLanguage(value)
    }

  */

    let setEnvironment = (value) => {
        console.log("AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        let api_server_port;
       switch( theNodeEnvironment) {
            case "DEV":
                api_server_port = 3003;
                websocket_server_port = 8001;
                break;
            case "TEST":
                api_server_port = 3002;
                websocket_server_port = 8002;
                break;
            case "PRODUCTION":
                api_server_port = 3001;
                websocket_server_port = 8003;
                break;
            case "CI":
                api_server_port = 3004;
                websocket_server_port = 8004;
                break;
        }
        console.log("setting state db to " + theNodeEnvironment + " port to " + api_server_port)
        setSocketUrl('ws://localhost:'+websocket_server_port)
        setNodeEnv(theNodeEnvironment);
        setApiPort(api_server_port);
    }

    console.log("AuthenticatedApp Rendering App with props = " + JSON.stringify(props))
//    let merged_theme = deepMerge(grommet, bubbles_theme)
//    setBubblesTheme(JSON.parse(JSON.stringify(merged_theme)))
    if( lastJsonMessage !== null && typeof (lastJsonMessage.status) !== 'undefined' && lastJsonMessage.status !== null ) {
        lastCompleteStatusMessage = JSON.parse(JSON.stringify(lastJsonMessage))
    } else {
        if( lastJsonMessage !== null && typeof (lastJsonMessage.message_type) !== 'undefined' && lastJsonMessage.message_type !== null ) {
            console.log("Last json message was a measurement " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
            processMeasurementMessage(lastJsonMessage)
        } else {
            console.log("Last json message is INVALID! " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
        }
    }
    console.log("local_switch state = " + JSON.stringify(local_state.switch_state))
    let thestate = JSON.parse(JSON.stringify(local_state))
    console.log("thestate switch state = " + JSON.stringify(thestate.switch_state))

    if (typeof(lastCompleteStatusMessage) !== 'undefined' && lastCompleteStatusMessage !== null) {
//        console.log("lastjsonmessage = " + JSON.stringify(lastJsonMessage))
//        thestate = JSON.parse(JSON.stringify(lastCompleteStatusMessage))
        console.log("after last complete status message thestate switch state = " + JSON.stringify(thestate.switch_state))
    }
//    console.log("authenticatedapp status = " + JSON.stringify(thestate.status))
 //   console.log("authenticatedapp heater = " + thestate.switch_state.heater.on)

//    console.log("thestate = " + JSON.stringify(thestate))
//    console.log("thestate.switch_state = " + JSON.stringify(thestate.switch_state))

    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment} nodeEnv={nodeEnv} readyState={readyState} handleClickSendMessage={handleClickSendMessage}/>
                <Tabs margin="medium" flex="shrink">
                    <Tab title="Cabinet Control">
                        <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                          settings={local_settings}
                                          state={thestate} switch_state={thestate.switch_state}
                                          setStateFromChild={setSwitchStateFromChild}/>
                    </Tab>
                    <Tab title="Status">
                        <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                         settings={local_settings}  state={local_state}/>
                    </Tab>
                    <Tab title="Cabinet Setup">
                        <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                        settings={local_settings} state={local_state}
                                        setStateFromChild={setCabinetSettingsStateFromChild}
                        />
                    </Tab>
                    <Tab title="Device Map">
                        <RenderDeviceMap nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                     onMapChange={applyMapChange}
                                     state={local_state}/>
                    </Tab>
                    <Tab title="Automation">
                        <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                        settings={local_settings} state={local_state}
                                        setStateFromChild={setAutomationStateFromChild}/>
                    </Tab>
                    <Tab title="Events">
                        <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                    </Tab>
                    <Tab title="Display Settings">
                        <RenderDisplaySettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                               settings={local_settings} state={local_state} onApplyFontChange={applyFontChange}
                                               onLocalFontChange={localFontChange}/>
                    </Tab>
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                     onFontChange={applyFontChange}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                </Tabs>
        </div>
    );
}

export default AuthenticatedApp