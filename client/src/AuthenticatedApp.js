import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';

import {Tabs, Tab} from "rendition";
import {Avatar, Button, Sidebar, Nav, Grid} from 'grommet'
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderDisplaySettings from "./components/DisplaySettingsTab/DisplaySettingsTabFunctional"
import RenderSettings from "./components/StationSettingsTab/StationSettingsTabFunctional"
import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
import RenderDeviceMap from "./components/DeviceMapTab/DeviceMapTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import RenderCameraTab from "./components/CameraTab/CameraTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
import {Add, Projects,Clock,Help} from 'grommet-icons'
import {TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core'
// import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'
import initial_settings from './initial_settings.json'

import useWebSocket from 'react-use-websocket';
import './Palette.css'

import util from './util'

const SWITCH_COMMAND="switch"
const PICTURE_COMMAND="picture"


/**
 * @fileOverview Component containing the top-level of the application for a user who is logged in.
 * @component
 * @author John Rodley
 * @version: X.x
 */
function AuthenticatedApp (props) {
    console.log("props = " + JSON.stringify(props))


    //
    //
    //
    // UTILITY FUNCTIONS FOR CREATING REACT SUB-COMPONENTS
    //
    //
    //

    /**
     * Create a React Button with specified label for "station" button in the sidebar.
     * @param value     An object containing label values
     * @param index     not used
     * @param arr       not used
     * @returns {JSX.Element}   A React Button element
     */
    function getStationButton(value, index, arr ) {
        console.log("getStationButton value " + JSON.stringify(value))
        return <Button label={value.station_name+":"+value.stationid+" ("+value.attached_devices.length+")"} />
    }

    /**
     * An object containing all the parameters needed to do connectivity to the rest of the site/station
     * @type {{activemq_server_host: string, api_server_port: number, api_server_host: string, websocket_server_host: string, activemq_server_port: number, websocket_server_port: number}}
     */
    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    /**
     * If we login as a different user, rerender
     */
    const [userid,setUserid] = useState(90000009);
    /**
     * If we change the langauge, rerender
     */
    const [language, setLanguage] = useState('');
    /**
     * If we change the socket URL, rerender
     */
    const [socketUrl, setSocketUrl] = useState('ws://localhost:'+servers.websocket_server_port);
    /**
     * ????
     * @type {React.MutableRefObject<*[]>}
     */
    const messageHistory = useRef([]);

    /**
     * The last complete status message received from outside.  Is this still used?
     */
    let lastCompleteStatusMessage


    /**
     * Get the configuration of the SITE specified by siteid from the API.
     *
     * @param host      hostname or ip of the controller API server
     * @param port      port number of the controller API server
     * @param siteid    ID of the site we want
     * @returns {Promise<unknown>}  Response status (200 ...) from the API call
     */
    const getSite = (host, port, siteid) => {
        console.log("getSite calling out to api")

        return new Promise( async (resolve, reject) => {
            const response = await fetch('http://'+host+':'+port+'/api/station/site/'+siteid);
//            const response = await fetch('http://'+host+':'+port+'/api/config/90000009/70000007');
            console.log("getSite response received")
            if(response.ok) {
                console.log("getSite awaiting site")
                let x = await response.json();
                console.log("getSite Got " + JSON.stringify(x));
                resolve(x)
            } else {
                console.log("getSite error " + response.status)
                reject( response.status )
            }
        })
    }

    /**
     * Get the list of devices (Pi) attached to the specified user.
     *
     * @param host      hostname or ip of the controller API server
     * @param port      port number of the controller API server
     * @param userid    ID of the logged-in user
     * @returns {Promise<unknown>}  Response status (200 ...) from the API call
     * @todo this is redundant with getSite - eliminate
     */
    const getDeviceList = (host, port, userid) => {
        console.log("getDeviceList calling out to api")

        return new Promise( async (resolve, reject) => {
            const response = await fetch('http://'+host+':'+port+'/api/device/'+userid);
            if(response.ok) {
                let x = await response.json();
                console.log(JSON.stringify(x))
                console.log("Got devices " + JSON.stringify(x));
                resolve(x)
            } else {
                console.log("error " + response.status)
                reject( response.status )
            }
        })
    }

    //
    //
    //
    // HANDLING THE NEW STATION DIALOG
    //
    //
    //
    /**
     * The open/closed true/false state of the "new station" dialog box
     */
    const [open, setOpen] = React.useState(false);

    /**
     * Respond to the "new station" button by opening the new station dialog
     */
    const handleOpen = () => {
        setOpen(true);
    }

    /**
     * Respond to the OK button in the new station dialog
     */
    const handleToClose = () => {
        setOpen(false);
    }

    /**
     * Send a "take picture" command to all the devices attached to this controller.
     */
    const takeAPicture = () => {
        console.log("takeAPicture")
        let cmd = {
            command: PICTURE_COMMAND,
        }
        sendJsonMessage(cmd)
    }

    //
    //
    //
    // PROCESSING MEASUREMENT MESSAGES
    //
    //
    //
    /**
     * Apply the values in a new measurement message to the state values that control
     * what is displayed in the UI taken from the WebSocket service.
     *
     * @param message   A "measurement" message from one of the attached devices.
     */
    const processMeasurementMessage = (message) => {
        console.log("processMeasurementMessage "+JSON.stringify(message))
        applyMeasurementToState(message)
    }

    /**
     * Apply the values in a new measurement message to the state values that control
     * what is displayed in the UI taken from the WebSocket service.
     *
     * @param message   A "measurement" message from one of the attached devices.
     */
    /// TODO this looks like a dupe of processMeasurement - get rid of one of them
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

    /**
     * Handle a single message that came to the UI from a device via the WebSocket
     * @param event The formatted message
     */
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

    /**
     * The WebSocket hook that defines how we handle WebSocket messages - sendJsonMessage is our sender, lastJsonMessage is the last
     * message received, readyState is the state of the connection.
     */
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

    /**
     *  The memo hook that ????
     */
    messageHistory.current = useMemo(() =>
        messageHistory.current.concat(lastJsonMessage), [lastJsonMessage]);


    /**
     * Send a random humidity message over the websocket
     */
    const sendit = () => {
        let x = JSON.parse(JSON.stringify(local_state))
        if (lastJsonMessage) {
            x = JSON.parse(JSON.stringify(lastJsonMessage))
        }
        x.status.humidity_internal = 69 + getRandomInt(10)
        sendJsonMessage(x);
    }

    /**
     * Respond to a test button by sending a random humidity message over the websocket
     * @type {function(): void}
     */
    const handleClickSendMessage = useCallback(() =>
        sendit(), []);


    //
    //
    //
    // RANDOM UTILITIES
    //
    //
    //

    /**
     * Get a random int between 0 and specified max inclusive
     * @param max   the largest number that can be returned
     * @returns {number}    the random number
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    //
    //
    //
    // CHANGING STATE FROM CHILD COMPONENTS - THESE ARE PASSED TO CHILDREN
    //
    //
    //
    /**
     * Change the state of the specified switch to the specified value and
     * save to useState for a rerender.
     *
     * @param switch_name   The name of the switch from switch_names enum
     * @param on    True/false on/off
     */
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


    /**
     * Save to persistent store an individual presence/absence setting for a single
     * sensor/control item in the current station.
     *
     * @param thing_name    The unique name of the sensor/control item
     * @param present       True/false - true present, false absent
     * @returns {Promise<unknown>}  The response status (200,500 ...) from the save setting API call
     * @memberOf AuthenticatedApp
     */
    const saveSetting = (thing_name, present ) => {
        console.log("saveSetting calling out to api")

        return new Promise( async (resolve, reject) => {
            const url = 'http://'+servers.api_server_host+':'+servers.api_server_port+'/api/config/'+userid+'/'+'70000007'+'/sensor/'+thing_name+'/present/'+present;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if(response.ok) {
                let x = await response.json();
                console.log(JSON.stringify(x))
                console.log("Got devices " + JSON.stringify(x));
                resolve(x)
            } else {
                console.log("error " + response.status)
                reject( response.status )
            }
        })
    }

    /**
     * Set a state variable with the specified station_settings object and cause rerender
     *
     * @param x a complete station_settings object - overwrites ALL values
     */
    function setStationSettingsStateFromChild(x) {
        let newstate = JSON.parse(JSON.stringify(local_state))
        newstate.station_settings = JSON.parse(JSON.stringify(x.station_settings))
        setState(newstate)
    }

    /**
     * Function passed to child visual objects such that they can set the state of a controllable switch on a device.
     *
     * @param x ???
     * @param switch_name   The name of the switch we're changing the state of
     * @param on    True/false on/off
     */
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

    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))

    /**
     * wtf??
     * @param value
     */
    const applyMapChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        console.log("AuthenticatedApp applyMapChange");
        /// TODO FINISH!
    }

    /**
     * Apply a font-family change from the display settings screen
     *
     * @param value the name of the new font-family
     */
    const applyFontChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        console.log("AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font + " value " + value )
        x.global.font.family = current_font;
        console.log("AuthenticatedApp should rerender to font " + x.global.font.family)
        setBubblesTheme(x)
    }

    /**
     * Change the value of the current font from within this component
     * @param value The font object we need to change to??
     */
    const localFontChange = (value) => {
        console.log("AuthenticatedApp localFontChange from " + current_font + " to " + value)
        setCurrentFont(value)
    }

    //
    //
    //
    // STATE VARIABLES - CHANGING ANY OF THESE FROM SET FUNCTIONS WILL CAUSE RERENDER
    //
    //
    //
    /**
     * The value of environment variable NODE_ENV which controls the hostname and port the API
     * is listening on. Changing this causes a rerender
     */
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv);
    /**
     * The siteid of the site we're controlling.  This is the top level object in the hierarchy - site/station/device/module/sensor
     * Changing this causes a rerender
     */
    const [siteid, setSiteid] = useState(1);
    /**
     * The site we're controlling.  This is the top level object in the hierarchy - site/station/device/module/sensor
     * Changing this causes a rerender
     */
    /// TODO why do we need this AND siteid?
    const [site, setSite] = useState({stations: [{attached_devices: [{}]}]});


    const [apiPort, setApiPort] = useState(servers.api_server_port);  // The port we should send queries to - depends on dev/test/prod
    const apiHost = "localhost"
//    const [language, setLanguage] = useState("all");
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    const [current_font, setCurrentFont] = useState(initial_theme.global.font.family)
    const [lastpicture, setLastPicture] = useState(0)

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const [local_state, setState] = useState(initial_state);
    const [local_settings, setSettings] = useState(initial_settings);


    /**
     * The effect hook that casues a refetch of the SITE and rerender if nodeEnv changes
     */
    useEffect(() => {
        const fetchData = async () => {
            let z = {}
            z.stations = await getSite('localhost', 3003, siteid)
            console.log("site = " + JSON.stringify(z))
            setSite(z)
        }
        fetchData();
    }, [nodeEnv])



    /*   let setLang = (value) => {
           console.log("AuthenticatedApp setting language to " + value)
           setLanguage(value)
       }

     */

    /**
     * Set the local state values that control what this app displays based on the NODE_ENV.
     *
     * @param value The value of NODE_ENV
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


    console.log("site.stations = " + JSON.stringify(site.stations))
    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment} nodeEnv={nodeEnv} readyState={readyState} handleClickSendMessage={handleClickSendMessage}/>
            <Dialog open={open} onClose={handleToClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a station</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a station to this site, enter a unique station name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Station Name"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleToClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid
                margin={"medium"}
                justify={'center'}
                round={'xxsmall'}
                direction={'horizontal'}
                fill
                areas={[
                    { name: 'sidebar', start: [0, 0], end: [0, 0] },
                    { name: 'main', start: [1, 0], end: [1, 0] },
                ]}
                columns={['small','xlarge']}
                rows={['800px']}
                gap={"small"}
            >
                <Sidebar gridArea="sidebar" background="#477CBC" round="small"
                         header={
                             <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                         }
                         footer={
                             <Button icon={<Help />} hoverIndicator />
                         } >
                    <Nav gap="small">
                        <Button icon={<Add />} onClick={handleOpen}/>
                        {site.stations.map(getStationButton)}
                        <Button icon={<Clock />} hoverIndicator />
                    </Nav>
                </Sidebar>

                <Tabs gridArea="main" margin="medium" flex="shrink">
                    <Tab title="Station Control">
                        <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                          settings={local_settings}
                                          state={thestate} switch_state={thestate.switch_state}
                                          setStateFromChild={setSwitchStateFromChild}/>
                    </Tab>
                    <Tab title="Look Inside">
                        <RenderCameraTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} devices={site.stations[0].attached_devices}
                                         lastpicture={lastpicture} onFontChange={applyFontChange} takeAPicture={takeAPicture}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                    <Tab title="Status">
                        <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                         settings={local_settings}  state={local_state}/>
                    </Tab>
                    <Tab title="Station Setup">
                        <RenderSettings saveSetting={saveSetting} nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                        settings={local_settings} state={local_state}
                                        setStateFromChild={setStationSettingsStateFromChild}
                        />
                    </Tab>
                    <Tab title="Device Map">
                        <RenderDeviceMap nodeEnv={nodeEnv} apiPort={apiPort} apiHost={apiHost} theme={bubbles_theme}
                                     onMapChange={applyMapChange}
                                         station={site.stations[0]}
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
            </Grid>
        </div>
    );
}

export default AuthenticatedApp