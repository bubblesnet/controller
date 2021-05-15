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
import RenderSiteStationMenu from "./components/SiteStationMenu";
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
import {addStation,saveSetting, getSite} from './api/utils'

import './logimplementation'
import log from 'roarr';

const STATUS_COMMAND="status"
const SWITCH_COMMAND="switch"
const PICTURE_COMMAND="picture"

/**
 * @fileOverview Component containing the top-level of the application for a user who is logged in.
 * @component
 * @author John Rodley
 * @version: X.x
 */
function AuthenticatedApp (props) {
//    log.trace("render AuthenticatedApp " + JSON.stringify(props))
    log.debug("render AuthenticatedApp " + JSON.stringify(props));

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
        log.debug("getStationButton value " + JSON.stringify(value))
        return <Button onClick={changeStation} value={value.stationid} label={value.station_name+":"+value.stationid+" ("+value.attached_devices.length+")"} />
    }

    function changeStation(ev) {
        alert("change station to "+ev.target.value)
    }

    /**
     * An object containing all the parameters needed to do connectivity to the rest of the site/station
     * @type {{activemq_server_host: string, api_server_port: number, api_server_host: string, websocket_server_host: string, activemq_server_port: number, websocket_server_port: number}}
     */
    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    //
    //
    //
    // STATE VARIABLES - CHANGING ANY OF THESE FROM SET FUNCTIONS WILL CAUSE RERENDER
    //
    //
    //
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

    const [siteName, setSiteName] = useState("undefined!!!");
    /**
     * The value of environment variable NODE_ENV which controls the hostname and port the API
     * is listening on. Changing this causes a rerender
     */
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv);
    /**
     * Port the API server is listening on - change it and rerender
     * @todo why is this here when we can derive it from nodeEnv
     */
    const [apiPort, setApiPort] = useState(servers.api_server_port);  // The port we should send queries to - depends on dev/test/prod
    /**
     * Host the API server is running on - change it and rerender
     * @todo why is this here when we can derive it from nodeEnv
     */
//    const apiHost = "localhost"
    /**
     * Deep object of the current theme - change it and rerender
     */
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    /**
     * Name of the current font family - change it and rerender
     */
    const [current_font, setCurrentFont] = useState(initial_theme.global.font.family)
    const [currentStationIndex, setCurrentStationIndex] = useState(0)
    const [lastpicture, setLastPicture] = useState(0)

    function setStation( index ) {
        log.debug("state: setCurrentStationIndex " + index)
        setCurrentStationIndex(index)
    }
    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    /**
     * Local copy of all data (temp ...) - change and rerender
     */
    const [local_state, setState] = useState(initial_state);
    /**
     * Local copy of all settings - change and rerender
     */
    const [local_settings, setSettings] = useState(initial_settings);
    /**
     * If we login as a different user, rerender
     */
    const [userid,setUserid] = useState(90000009);
    /**
     * If we change the langauge, rerender
     */
    const [language, setLanguage] = useState('');
    /**
     * If we change the web socket URL, rerender
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
     * Respond to the OK button in the new station dialog
     */
    const handleToAdd = async () => {
//        alert("Adding station named " + new_station_name )
        setOpen(false);
        let x = await addStation(servers.api_server_host, servers.api_server_port, siteid, new_station_name )
    }

    const [new_station_name, setNewStationName] = useState("");
    const updateNewName = (e) => {
        setNewStationName(e.target.value)
    }

    /**
     * Send a "take picture" command to all the devices attached to this controller.
     */
    const takeAPicture = () => {
        log.debug("button: takeAPicture")
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
//        log.trace("processMeasurementMessage "+JSON.stringify(message))
        applyMeasurementToState(message)
    }

    /**
     * Apply the values in a new measurement message to the state values that control
     * what is displayed in the UI taken from the WebSocket service.
     *
     * @param msg   A "measurement" message from one of the attached devices.
     */
    /// TODO this looks like a dupe of processMeasurement - get rid of one of them
    const applyMeasurementToState = (msg) => {
//        log.debug("applyMeasurementToState "+JSON.stringify(msg))
        if( typeof msg.value === 'undefined' ) {
            log.error("msg: BAD measurement message " + JSON.stringify(msg))
        } else {
            local_state.status[msg.measurement_name] = msg.value
            local_state.status[msg.measurement_name + "_direction"] = msg.direction
//        log.debug( "direction!!! local_state.status["+msg.measurement_name+"_direction"+"] = " + msg.direction )
            log.debug("msg: applying " + msg.value + " " + local_state.status[msg.measurement_name + "_direction"] + " to " + msg.measurement_name)
        }
    }

    /**
     * Handle a single message that came to the UI from a device via the WebSocket
     * @param event The formatted message
     */
    const handleWebSocketMessage = ( event ) => {
        log.debug("ws: handling websocket message " + JSON.stringify(event.data))
        let msg = JSON.parse(event.data)
        if( typeof(msg.status) === 'undefined' || msg.status === null ) {
            if( typeof(msg.message_type) === 'undefined' || msg.message_type === null ) {
                log.error("ws: received invalid message " + event.data)
            } else {
                log.trace("ws: received message type "+msg.message_type);
                switch (msg.message_type) {
                    case "measurement":
                        log.debug("ws: received measurement");
                        applyMeasurementToState(msg)
                        break;
                    case "switch_event":
                        log.debug("ws: received switch event " + JSON.stringify(msg));
                        toggleSwitchTo(msg.switch_name, msg.on)
                        break;
                    case "event":
                        log.debug("ws: received event");
                        break;
                    case "picture_event":
                        log.debug("ws: received picture event");
                        setLastPicture(lastpicture+1)
                        break;
                    default:
                        log.debug("ws: unknown message type " + msg.message_type)
                        break;
                }
            }
        } else {
            log.error("ws: AAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHH   Received valid status message")
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
        onOpen: () => { getDeviceStatus(); log.info('ws: websocket opened'); },
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

    function getDeviceStatus() {
        log.info("aq: getDeviceStatus()")
        let cmd = {
            command: STATUS_COMMAND,
        }
        sendJsonMessage(cmd)

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
        log.info("button: toggleSwitchTo " + switch_name + " to " + on)
        if( typeof(switch_name) === 'undefined') {
            return
        }
        let newstate = JSON.parse(JSON.stringify(local_state))
        if( typeof newstate.switch_state[switch_name] === 'undefined') {
            console.error( "button: bad switch_name " + switch_name)
            return
        }
        newstate.switch_state[switch_name].on = on
        setState(newstate)
    }


    /**
     * Set a state variable with the specified station_settings object and cause rerender
     *
     * @param x a complete station_settings object - overwrites ALL values
     */
    async function setStationSettingsStateFromChild(x) {
        let newstate = JSON.parse(JSON.stringify(local_state))
        newstate.station_settings = JSON.parse(JSON.stringify(x.station_settings))
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "humidifier", newstate.station_settings.humidifier)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "humidity_sensor_internal", newstate.station_settings.humidity_sensor_internal)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "humidity_sensor_external", newstate.station_settings.humidity_sensor_external)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "heater", newstate.station_settings.humidifier)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "thermometer_top", newstate.station_settings.heater)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "thermometer_middle", newstate.station_settings.thermometer_middle)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "thermometer_bottom", newstate.station_settings.thermometer_bottom)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "thermometer_external", newstate.station_settings.thermometer_external)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "thermometer_water", newstate.station_settings.thermometer_water)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "water_pump", newstate.station_settings.water_pump)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "air_pump", newstate.station_settings.air_pump)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "light_sensor_internal", newstate.station_settings.light_sensor_internal)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "light_sensor_external", newstate.station_settings.light_sensor_external)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "station_door_sensor", newstate.station_settings.station_door_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "outer_door_sensor", newstate.station_settings.outer_door_sensor)
//        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "movement_sensors", newstate.station_settings.??)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "pressure_sensors", newstate.station_settings.pressure_sensors)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "root_ph_sensor", newstate.station_settings.root_ph_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "water_level_sensor", newstate.station_settings.water_level_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "intake_fan", newstate.station_settings.intake_fan)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "exhaust_fan", newstate.station_settings.exhaust_fan)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "heat_lamp", newstate.station_settings.heat_lamp)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "heating_pad", newstate.station_settings.heating_pad)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "light_bloom", newstate.station_settings.light_bloom)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "light_vegetative", newstate.station_settings.light_vegetative)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "light_germinate", newstate.station_settings.light_germinate)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "height_sensor", newstate.station_settings.height_sensor)
//        setState(newstate)
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

    /**
     * wtf??
     * @param value
     */
    const applyMapChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        log.trace("button: AuthenticatedApp applyMapChange");
        /// TODO FINISH!
    }

    /**
     * Apply a font-family change from the display settings screen
     *
     * @param value the name of the new font-family
     */
    const applyFontChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        log.info("button: AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font + " value " + value )
        x.global.font.family = current_font;
        log.trace("button: AuthenticatedApp should rerender to font " + x.global.font.family)
        setBubblesTheme(x)
    }

    /**
     * Change the value of the current font from within this component
     * @param value The font object we need to change to??
     */
    const localFontChange = (value) => {
        log.trace("button: AuthenticatedApp localFontChange from " + current_font + " to " + value)
        setCurrentFont(value)
    }


    /**
     * The effect hook that casues a refetch of the SITE and rerender if nodeEnv changes
     */
    useEffect(() => {
        const fetchData = async () => {
            let z = {}
            z.stations = await getSite(servers.api_server_host, servers.api_server_port, siteid)
//            log.trace("site = " + JSON.stringify(z))
            setSiteName(z.stations[0].site_name)
            setSite(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    }, [nodeEnv])



    /*   let setLang = (value) => {
           log.trace("AuthenticatedApp setting language to " + value)
           setLanguage(value)
       }

     */

    /**
     * Set the local state values that control what this app displays based on the NODE_ENV.
     *
     * @param value The value of NODE_ENV
     */
    let setEnvironment = (value) => {
        log.info("button: AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        servers = util.get_server_ports_for_environment(props.nodeEnv)
        log.trace("button: setting state db to " + theNodeEnvironment + " port to " + servers.api_server_port)
        setSocketUrl('ws://'+servers.websocket_server_host+':'+servers.websocket_server_port)
        setNodeEnv(theNodeEnvironment);
        setApiPort(servers.api_server_port);
    }

    log.trace("AuthenticatedApp Rendering App with props = " + JSON.stringify(props))
//    let merged_theme = deepMerge(grommet, bubbles_theme)
//    setBubblesTheme(JSON.parse(JSON.stringify(merged_theme)))
    if( lastJsonMessage !== null && typeof (lastJsonMessage.status) !== 'undefined' && lastJsonMessage.status !== null ) {
        lastCompleteStatusMessage = JSON.parse(JSON.stringify(lastJsonMessage))
    } else {
        if( lastJsonMessage !== null && typeof (lastJsonMessage.message_type) !== 'undefined' && lastJsonMessage.message_type !== null &&
        lastJsonMessage.message_type === 'measurement') {
            log.debug("msg: Last json message was a measurement " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
            processMeasurementMessage(lastJsonMessage)
        } else {
            log.warn("msg: Last json message not a measurement! " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
        }
    }
    let thestate = JSON.parse(JSON.stringify(local_state))

    if (typeof(lastCompleteStatusMessage) !== 'undefined' && lastCompleteStatusMessage !== null) {
        thestate = JSON.parse(JSON.stringify(lastCompleteStatusMessage))
    }

    /** TODO fix this - needed for sidebar
     *
     * @type {string}
     */
    site.site_name = siteName
    site.siteid = siteid

//    log.trace("site = " + JSON.stringify(site))
    return (
        <div className="App">
            <Header siteName={siteName} setNodeEnv={setEnvironment} nodeEnv={nodeEnv} readyState={readyState} handleClickSendMessage={handleClickSendMessage}/>
            <Dialog open={open} onClose={handleToClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a station</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a station to this site, enter a unique station name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="new_station_name"
                        label="Station Name"
                        fullWidth
                        onChange = {updateNewName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleToAdd} color="primary">
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
                             <Avatar src="//s.gravatar.com/avatar/03e2a5b132702f8c65e793b743be4418?s=80" />
                         }
                         footer={
                             <Button icon={<Help />} hoverIndicator />
                         } >
                    <Nav gap="small">
                        <Button icon={<Add />} onClick={handleOpen}/>
                        <RenderSiteStationMenu currentStationIndex={currentStationIndex} site={site} setCurrentStationIndex={setStation}/>
                        <Button icon={<Clock />} hoverIndicator />
                    </Nav>
                </Sidebar>

                <Tabs gridArea="main" margin="medium" flex="shrink">
                    <Tab title="Station Control">
                        <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                          station={site.stations[currentStationIndex]}
                                          settings={local_settings}
                                          state={thestate} switch_state={thestate.switch_state}
                                          setStateFromChild={setSwitchStateFromChild}/>
                    </Tab>
                    <Tab title="Look Inside">
                        <RenderCameraTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme} devices={site.stations[0].attached_devices}
                                         station={site.stations[currentStationIndex]}
                                         lastpicture={lastpicture} onFontChange={applyFontChange} takeAPicture={takeAPicture}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                    <Tab title="Status">
                        <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                         station={site.stations[currentStationIndex]}
                                         settings={local_settings}  state={local_state}/>
                    </Tab>
                    <Tab title="Station Setup">
                        <RenderSettings saveSetting={saveSetting} nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                        station={site.stations[currentStationIndex]}
                                        settings={local_settings} state={local_state}
                                        setStateFromChild={setStationSettingsStateFromChild}
                        />
                    </Tab>
                    <Tab title="Device Map">
                        <RenderDeviceMap nodeEnv={nodeEnv} apiPort={apiPort} apiHost={servers.api_server_host} theme={bubbles_theme}
                                     onMapChange={applyMapChange} station={site.stations[currentStationIndex]}
                                     state={local_state}/>
                    </Tab>
                    <Tab title="Automation">
                        <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                        station={site.stations[currentStationIndex]}
                                        settings={local_settings} state={local_state}
                                        setStateFromChild={setSwitchStateFromChild}/>
                    </Tab>
                    <Tab title="Events">
                        <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}/>
                    </Tab>
                    <Tab title="Display Settings">
                        <RenderDisplaySettings nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                               station={site.stations[currentStationIndex]}
                                               settings={local_settings} state={local_state} onApplyFontChange={applyFontChange}
                                               onLocalFontChange={localFontChange}/>
                    </Tab>
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} theme={bubbles_theme}
                                     station={site.stations[currentStationIndex]}
                                     onFontChange={applyFontChange}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                </Tabs>
            </Grid>
        </div>
    );
}

export default AuthenticatedApp