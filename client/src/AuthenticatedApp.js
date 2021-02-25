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
import RenderCameraTab from "./components/CameraTab/CameraTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
// import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'
import initial_settings from './initial_settings.json'

import useWebSocket from 'react-use-websocket';

import util from './util'

const SWITCH_COMMAND="switch"
const PICTURE_COMMAND="picture"

function AuthenticatedApp (props) {
    console.log("props = " + JSON.stringify(props))

    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    //Public API that will echo messages sent to it back to the client
//    const [apiConnected, setApiConnected] = useState(0);
    const [language, setLanguage] = useState('');
    const [socketUrl, setSocketUrl] = useState('ws://localhost:'+servers.websocket_server_port);
    const messageHistory = useRef([]);
    let lastCompleteStatusMessage

    const takeAPicture = () => {
        console.log("takeAPicture")
        let cmd = {
            command: PICTURE_COMMAND,

        }
        sendJsonMessage(cmd)
    }
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
        console.log("applyMeasurementToState "+JSON.stringify(msg))
        if( typeof msg.value === 'undefined' ) {
            console.log("BAD measurement message " + JSON.stringify(msg))
        } else {
            local_state.status[msg.measurement_name] = msg.value
            local_state.status[msg.measurement_name + "_direction"] = msg.direction
//        console.log( "direction!!! local_state.status["+msg.measurement_name+"_direction"+"] = " + msg.direction )
            console.log("Applying " + msg.value + " " + local_state.status[msg.measurement_name + "_direction"] + " to " + msg.measurement_name)
        }
    }

    function toggleSwitchTo(switch_name, on ) {
        console.log("toggleSwitchTo " + switch_name + " to " + on)
        if( typeof(switch_name) === 'undefined') {
            return
        }
        let newstate = JSON.parse(JSON.stringify(local_state))
        if( typeof newstate.switch_state[switch_name] === 'undefined') {
            console.error( "bad switch_name " + switch_name)
            return
        }
        newstate.switch_state[switch_name].on = on
        setState(newstate)
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
                    case "switch_event":
                        console.log("received switch event " + JSON.stringify(msg));
                        toggleSwitchTo(msg.switch_name, msg.on)
                        break;
                    case "event":
                        console.log("received event");
                        break;
                    case "picture_event":
                        console.log("received picture event");
                        setLastPicture(lastpicture+1)
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

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function setCabinetSettingsStateFromChild(x) {
        let newstate = JSON.parse(JSON.stringify(local_state))
        newstate.cabinet_settings = JSON.parse(JSON.stringify(x.cabinet_settings))
        setState(newstate)
    }

    function setSwitchStateFromChild(x, switch_name, on ) {
        local_state.switch_state = JSON.parse(JSON.stringify(x.switch_state))
        sendJsonMessage(local_state); // This call causes a message to get reflected back to us that tells us the switch state has changed and rerender.
        let sw_name = switch_name
        if( switch_name === "growLight") {
            sw_name = "lightBloom"
        }

        let cmd = {
            command: SWITCH_COMMAND,
            switch_name: sw_name,
            on: on
        }
        sendJsonMessage(cmd)
    }

    /*
    function setAutomationStateFromChild(on) {
        let cmd = {
            command: SWITCH_COMMAND,
            switch_name: "automatic",
            on: on
        }

        local_state.automation_settings = JSON.parse(JSON.stringify(x.automation_settings))
        sendJsonMessage(cmd)

 //       sendJsonMessage(local_state); // This call causes a message to get reflected back to us that tells us the switch state has changed and rerender.
    }

     */

//    console.log("AuthenticatedApp initial theme " + JSON.stringify(initial_theme))
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    const [apiPort, setApiPort] = useState(servers.api_server_port);  // The port we should send queries to - depends on dev/test/prod
//    const [language, setLanguage] = useState("all");
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    const [current_font, setCurrentFont] = useState(initial_theme.global.font.family)
    const [lastpicture, setLastPicture] = useState(0)

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const [local_state, setState] = useState(initial_state);
    const [local_settings, setSettings] = useState(initial_settings);

    const applyMapChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        console.log("AuthenticatedApp applyMapChange");
        /// TODO FINISH!
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
        servers = util.get_server_ports_for_environment(props.nodeEnv)
        console.log("setting state db to " + theNodeEnvironment + " port to " + servers.api_server_port)
        setSocketUrl('ws://localhost:'+servers.websocket_server_port)
        setNodeEnv(theNodeEnvironment);
        setApiPort(servers.api_server_port);
    }

    console.log("AuthenticatedApp Rendering App with props = " + JSON.stringify(props))
//    let merged_theme = deepMerge(grommet, bubbles_theme)
//    setBubblesTheme(JSON.parse(JSON.stringify(merged_theme)))
    if( lastJsonMessage !== null && typeof (lastJsonMessage.status) !== 'undefined' && lastJsonMessage.status !== null ) {
        lastCompleteStatusMessage = JSON.parse(JSON.stringify(lastJsonMessage))
    } else {
        if( lastJsonMessage !== null && typeof (lastJsonMessage.message_type) !== 'undefined' && lastJsonMessage.message_type !== null &&
        lastJsonMessage.message_type === 'measurement') {
            console.log("Last json message was a measurement " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
            processMeasurementMessage(lastJsonMessage)
        } else {
            console.log("Last json message not a measurement! " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
        }
    }
    let thestate = JSON.parse(JSON.stringify(local_state))

    if (typeof(lastCompleteStatusMessage) !== 'undefined' && lastCompleteStatusMessage !== null) {
        thestate = JSON.parse(JSON.stringify(lastCompleteStatusMessage))
    }

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
                    <Tab title="Look Inside">
                        <RenderCameraTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                         lastpicture={lastpicture} onFontChange={applyFontChange} takeAPicture={takeAPicture}
                                     applicationSettings={local_state.application_settings}/>
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
                                        setStateFromChild={setSwitchStateFromChild}/>
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