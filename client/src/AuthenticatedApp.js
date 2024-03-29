/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useState, useMemo, useRef, useEffect} from 'react';
import {Tabs, Tab} from "rendition";
import { Button, Grid} from 'grommet'
import Header from "./components/Header"
import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsTab/EventsFunctional";
import RenderDisplaySettings from "./components/DisplaySettingsTab/DisplaySettingsTabFunctional"
import RenderSettings from "./components/StationSettingsTab/StationSettingsTabFunctional"
import RenderDeviceMap from "./components/DeviceMapTab/DeviceMapTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import RenderCameraTab from "./components/CameraTab/CameraTabFunctional"
import RenderCalibration from "./components/CalibrationTab/CalibrationTabFunctional"
import RenderNutes from "./components/NutesTab/NutesTabFunctional"
import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'

import {TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core'

import sprintf from 'sprintf-js';

import useWebSocket from 'react-use-websocket';
import './Palette.css'

import util from './util'
import {addStation, saveSetting, getSite, saveAutomationSettings} from './api/utils'

import types from "./types"

// import './logimplementation'
import log from "roarr";
// import log from "./bubbles_logger"

import moment from "moment";

import {changeStage} from './api/utils';

// import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
// import {Avatar, Button, Sidebar, Nav, Grid, Text} from 'grommet'
// import RenderSiteStationMenu from "./components/SiteStationMenu";
// import {Add,Clock,Help} from 'grommet-icons'

// copyright and license inspection - no issues 4/13/22

const STATUS_COMMAND="status"
const SWITCH_COMMAND="switch"
const STAGE_COMMAND="stage"
const PICTURE_COMMAND="picture"
const DISPENSE_COMMAND="dispense"

let because = "don't know"

/**
 * @fileOverview Component containing the top-level of the application for a user who is logged in.
 * @component
 * @author John Rodley
 * @version: X.x
 */
function AuthenticatedApp (props) {
//    log.debug("render AuthenticatedApp " + JSON.stringify(props));
    var tilt_sound = new Audio("tilt.mp3");

    function play_tilt() {
        tilt_sound.play()
    }

    let initial_sensor_readings = {
        units: "IMPERIAL",
        temp_air_external: 0.0,
        temp_air_external_direction: "",
        temp_air_top: 0.0,
        temp_air_top_direction: "",
        temp_air_middle: 0.0,
        temp_air_middle_direction: "",
        temp_air_bottom: 0.0,
        temp_air_bottom_direction: "",
        temp_water: 0.0,
        temp_water_direction: "",
        root_ph: 0.0,
        root_ph_direction: "",
        humidity_internal: 0.0,
        humidity_internal_direction: "",
        light_internal: 0.0,
        light_internal_direction: "",
        humidity_external: 0.0,
        humidity_external_direction: "",
        plant_height: 0.0,
        outer_door_open: false,
        station_door_open: false,
        pressure_external: 0.0,
        pressure_internal: 0.0,
        pressure_external_direction: "",
        pressure_internal_direction: "",
        water_level: 0.0,
        voc: 0.0,
        voc_direction: "",
        voc_units: "ppm",
        co2: 0.0,
        co2_direction: "",
        co2_units: "ppb",
        ec: 0.0,
        ec_direction: "",
        ec_units: ""
    }

    /**
     * An object containing all the parameters needed to do connectivity to the rest of the site/station
     * @type {{activemq_server_host: string, api_server_port: number, api_server_host: string, websocket_server_host: string, activemq_server_port: number, websocket_server_port: number}}
     * now that nodeenv is set, we can figure out what URLs to talk to
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
     * The value of environment variable NODE_ENV which controls the hostname and port the API
     * is listening on. Changing this causes a rerender
     */
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv);

    /**
     * The user who has logged in.  If we login as a different user, rerender
     * TABLE: user
     */
    const [userid] = useState(props.user.userid);

    /**
     * The site we're controlling.  This is the top level object in the hierarchy - site/station/device/module/sensor
     * Changing this causes a rerender
     * TABLE: site
     */
    const [site, setSite] = useState(props.site);

    /**
     * The index of the station we're currently controlling.  Index into site.stations[]
     * TABLE: station
     */
    const [currentStationIndex] = useState(props.stationindex)

    const [selected_stage, setSelectedStage] = useState(site.stations[currentStationIndex].current_stage)
    const [selected_automation_settings,setSelectedAutomationSettings] = useState(props.automation_settings)

    /**
     * Local copy of all data (temp ...) - change and rerender
     */
    const [local_state] = useState(props.initial_station_state);
    const [switch_state, setSwitchState] = useState(props.initial_switch_state);
    const [sensor_readings] = useState(initial_sensor_readings);
    const [tilt,setTilt] = useState({ currently_tilted: false, last_tilt: 0} )
/*    let initial_lastseen = []
    for( let i = 0; i < site.stations[currentStationIndex].attached_devices.length; i++ ) {
        initial_lastseen.push({deviceid: site.stations[currentStationIndex].attached_devices[i].deviceid,
            lastseen_millis: site.stations[currentStationIndex].attached_devices[i].lastseen_millis})
    }
    console.log("initial_lastseen = " + JSON.stringify(initial_lastseen))
    const [lastseen, setLastseen] = useState(initial_lastseen)
*/

    /**
     * Port the API server is listening on - change it and rerender
     * @todo why is this here when we can derive it from nodeEnv
     */
    const [apiPort, setApiPort] = useState(servers.api_server_port);  // The port we should send queries to - depends on dev/test/prod

    /**
     * Deep object of the current theme - change it and rerender
     */
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));

    /**
     * Name of the current font family - change it and rerender
     */
    const [current_font, setCurrentFont] = useState(initial_theme.global.font.family)
    /**
     * ????
     */
    const [last_picture, setLastPicture] = useState(0)

    /**
     * If we change the language, rerender
     */
//    const [language, setLanguage] = useState('');
    /**
     * If we change the web socket URL, rerender
     */
    const [socketUrl, setSocketUrl] = useState('ws://' + servers.websocket_server_host + ':' + servers.websocket_server_port);

    //
    //
    // END STATE VARIABLES
    //
    //

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
    /*
    const handleOpen = () => {
        setOpen(true);
    }
*/

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
        let x = await addStation(servers.api_server_host, servers.api_server_port, site.siteid, new_station_name)
        log.trace(`addStation returns ${x}`)
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
        for (let i = 0; i < site.stations[currentStationIndex].attached_devices.length; i++) {
            let cmd = {
                command: PICTURE_COMMAND,
                userid: userid,
                deviceid: site.stations[currentStationIndex].attached_devices[i].deviceid
            }
            sendJsonMessage(cmd)
        }
    }

    /**
     * Send a "dispense" command to a specific device/dispenser.
     */
    function dispense( deviceid, dispenser_name, ms ) {
        let intms = Math.trunc( ms );
        alert("button: dispense " + dispenser_name + " for " + intms + "ms")
        let cmd = {
            command: DISPENSE_COMMAND,
            userid: userid,
            deviceid: deviceid,
            dispenser_name: dispenser_name,
            milliseconds: intms
        }
        log.info("Sending dispense message " + JSON.stringify(cmd))
        sendJsonMessage(cmd)
        log.info("Sent dispense message " + JSON.stringify(cmd) + "???????")
    }

    let various_dates = {
        start_date_current_stage: "25 days ago",
        start_date_next_stage: "10 days from now",
        date_last_training: "never",
        date_last_filter_change: "never"
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
     */
    const applyEventToState = (msg) => {
//        log.debug("msg: applying event " + JSON.stringify(msg))
        if (msg.sensor_name === 'tamper_sensor') {
            if (tilt.currently_tilted === false) {
                play_tilt()
            }
            let x = { currently_tilted: true, last_tilt: moment().unix()}
            setTilt(x)
        }
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
            if (typeof msg.value === 'undefined' ) {
                log.error("msg: BAD measurement message " + JSON.stringify(msg))
            } else {
                if (msg.measurement_name === types.measurement_name.water_level) {
                    sensor_readings[types.measurement_name.water_level] = sprintf.sprintf("%.1f", msg.value)
                }
                if( typeof sensor_readings === 'undefined') {
                    log.error("WTF")
                }
                sensor_readings[msg.measurement_name] = msg.value
                sensor_readings[msg.measurement_name + "_direction"] = msg.direction
                sensor_readings[msg.measurement_name + "_units"] = msg.units
                log.trace("msg: applying " + msg.value + " " + sensor_readings[msg.measurement_name + "_direction"] + " to " + msg.measurement_name)
            }
        }

    const setDeviceLastSeenByDeviceId = (deviceid) => {
        console.log("Just saw device " + deviceid)
    }
    const setModuleLastSeenByMeasurementName = (msg) => {
        console.log("Just saw module for " + JSON.stringify(msg))
    }

    /**
     * Handle a single message that came to the UI from a device via the WebSocket
     * @param event The formatted message
     */
    const handleWebSocketMessage = (event) => {
        log.trace("ws: handling websocket message " + JSON.stringify(event.data))
        let msg = JSON.parse(event.data)
        if (typeof (msg.status) === 'undefined' || msg.status === null) {
            if (typeof (msg.message_type) === 'undefined' || msg.message_type === null) {
                log.error("ws: received invalid message " + event.data)
            } else {
                log.trace("ws: received message type " + msg.message_type);
                setDeviceLastSeenByDeviceId(msg.deviceid)
                switch (msg.message_type) {
                    case types.message_type.measurement:
                        because = "mmt " + msg.measurement_name + " " + msg.sample_timestamp
                        log.trace("ws: received measurement");
                        applyMeasurementToState(msg)
                        setModuleLastSeenByMeasurementName(msg)
                        break;
                    case types.message_type.dispenser_event:
                        because = "dispenser_evt " + msg.dispenser_name
                        log.info("ws: received dispenser_event " + JSON.stringify(msg));
                        toggleDispenserTo(msg.dispenser_name, msg.on)
                        break;
                    case types.message_type.switch_event:
                        because = "switch_evt " + msg.switch_name
                        log.trace("ws: received switch_event " + JSON.stringify(msg));
                        toggleSwitchTo(msg.switch_name, msg.on)
                        break;
                    case types.message_type.event:
                        because = "evt msg " + msg.sample_timestamp
                        log.trace("ws: received event ");
                        applyEventToState(msg)
                        break;
                    case types.message_type.picture_event:
                        because = "picture evt msg " + msg.sample_timestamp
                        log.trace("ws: received picture event");
//                        shutter_sound.play()
                        log.info("picture_event " + JSON.stringify(msg))
                        setLatestPictureFromChild(msg.deviceid,msg.picture_filename, msg.picture_datetime_millis)
//                        props.setLatestPictureFromChild(msg.deviceid,msg.picture_filename, msg.picture_datetime_millis)
                        setLastPicture(last_picture + 1)
                        break;
                    default:
                        because = msg.message_type + " message " + msg.sample_timestamp
                        log.debug("ws: unknown msg type " + msg.message_type)
                        break;
                }
            }
        } else {
            log.error("ws: AAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHH   Received valid status message")
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
        reconnectAttempts: 10000000, // Infinity - what's max value? Number.MAX_VALUE doesn't work.
        reconnectInterval: 30000,   // Why 30 seconds?  Seems long. Trying 3.
        onOpen: () => {
            getDeviceStatus();
            log.trace('ws: websocket opened');
        },
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
     * Respond to a test button by sending a random status request message over the websocket
     * @type {function(): void}
     */
//    const handleClickSendMessage = useCallback(() => {
//        getDeviceStatus()
//    },[]);

    const handleClickSendMessage = () => {
        log.trace("ws: handleClickSendMessage")
        getDeviceStatus()
    }
    //
    //
    //
    // RANDOM UTILITIES
    //
    //
    //
    function getDeviceStatus() {
        log.trace("aq: getDeviceStatus()")
        for( let i = 0; i < site.stations[currentStationIndex].attached_devices.length; i++ ) {
            let cmd = {
                command: STATUS_COMMAND,
                userid: userid,
                deviceid: site.stations[currentStationIndex].attached_devices[i].deviceid
            }
            sendJsonMessage(cmd)
        }
    }

    async function setLatestPictureFromChild(deviceid,latestpicture_filename, latestpicture_datetimemillis) {
        log.info("RenderCameraTab App setLatestPictureFromChild for deviceid " + deviceid + " to " + latestpicture_filename)
//            let z = await getSite(servers.api_server_host, servers.api_server_port, 1)
//            setSite(JSON.parse(JSON.stringify(z)))

        for (let i = 0; i < site.stations.length; i++) {
            for (let j = 0; j < site.stations[i].attached_devices.length; j++) {
                log.info("comparing " + site.stations[i].attached_devices[j].deviceid + " to " + deviceid)
                if (site.stations[i].attached_devices[j].deviceid === deviceid) {
                    let local_site = JSON.parse(JSON.stringify(site))
                    local_site.stations[i].attached_devices[j].latest_picture_filename = latestpicture_filename
                    local_site.stations[i].attached_devices[j].latest_picture_datetimemillis = latestpicture_datetimemillis
                    log.info("RenderCameraTab App setLatestPictureFromChild setting latest_picture_filename for deviceid " + deviceid + " to " + latestpicture_filename)
                    log.info("local_site = " + JSON.stringify(local_site))
                    setSite(JSON.parse(JSON.stringify(local_site)))
                    return
                }
            }
        }
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
    function toggleSwitchTo(switch_name, on) {
        log.trace("button: toggleSwitchTo " + switch_name + " to " + on)
        if (typeof (switch_name) === 'undefined') {
            return
        }
        let new_switch_state = JSON.parse(JSON.stringify(switch_state))
//        console.log("switch_state = " + JSON.stringify(switch_state))

        if( typeof(new_switch_state[switch_name] === 'undefined')) {
            new_switch_state[switch_name] = { on: on, changing: false}
        }
        new_switch_state[switch_name].on = on
//        console.log("Clearing changing new_switch_state[" + switch_name + "] to false")
        new_switch_state[switch_name].changing = false
        setSwitchState(new_switch_state)
    }

    /**
     * Change the state of the specified switch to the specified value and
     * save to useState for a rerender.
     *
     * @param switch_name   The name of the switch from switch_names enum
     * @param on    True/false on/off
     */
    async function toggleDispenserTo(dispenser_name, on) {
        log.info("button: toggleDispenserTo " + dispenser_name + " to " + on)
        if (typeof (dispenser_name) === 'undefined') {
            return
        }
        for( let i = 0; i < site.stations[currentStationIndex].dispensers.length; i++ ) {
            if( site.stations[currentStationIndex].dispensers[i].dispenser_name === dispenser_name) {
                let local_site = JSON.parse(JSON.stringify(site))
                local_site.stations[currentStationIndex].dispensers[i].onoff = on
                setSite(JSON.parse(JSON.stringify(local_site)))
                break
            }
        }
 /*
        let new_dispenser_state = JSON.parse(JSON.stringify(dispenser_state))
        log.info("dispenser_state = " + JSON.stringify(dispenser_state))

        if( typeof(new_dispenser_state[dispenser_name] === 'undefined')) {
            new_dispenser_state[dispenser_name] = { on: on, changing: false}
        }
        new_dispenser_state[dispenser_name].on = on
        log.info("Clearing changing new_dispenser_state[" + dispenser_name + "] to false")
        new_dispenser_state[dispenser_name].changing = false
        setDispenserState(new_dispenser_state)
  */
    }


    /**
     * Set a state variable with the specified station_settings object and cause rerender
     *
     * @param x a complete station_settings object - overwrites ALL values
     */
    async function setStationSettingsStateFromChild(x) {

        let changed_station = JSON.parse(JSON.stringify(x))
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "automatic_control", changed_station.automatic_control)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.humidifier, changed_station.humidifier)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.humidity_sensor_internal, changed_station.humidity_sensor_internal)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.humidity_sensor_external, changed_station.humidity_sensor_external)
//        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, "humidifier", changed_station.humidifier)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.water_heater, changed_station.water_heater)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.heater, changed_station.heater)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.thermometer_top, changed_station.thermometer_top)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.thermometer_middle, changed_station.thermometer_middle)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.thermometer_bottom, changed_station.thermometer_bottom)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.thermometer_external, changed_station.thermometer_external)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.thermometer_water, changed_station.thermometer_water)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.water_pump, changed_station.water_pump)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.air_pump, changed_station.air_pump)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.light_sensor_internal, changed_station.light_sensor_internal)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.light_sensor_external, changed_station.light_sensor_external)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.station_door_sensor, changed_station.station_door_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.outer_door_sensor, changed_station.outer_door_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.movement_sensor, changed_station.movement_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.pressure_sensors, changed_station.pressure_sensors)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.root_ph_sensor, changed_station.root_ph_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.water_level_sensor, changed_station.water_level_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.intake_fan, changed_station.intake_fan)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.exhaust_fan, changed_station.exhaust_fan)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.heat_lamp, changed_station.heat_lamp)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.heating_pad, changed_station.heating_pad)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.light_bloom, changed_station.light_bloom)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.light_vegetative, changed_station.light_vegetative)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.ac_device_name.light_germinate, changed_station.light_germinate)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.height_sensor, changed_station.height_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.voc_sensor, changed_station.voc_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.co2_sensor, changed_station.co2_sensor)
        await saveSetting(servers.api_server_host, servers.api_server_port, userid, site.stations[currentStationIndex].stationid, types.sensor_name.ec_sensor, changed_station.ec_sensor)

        let changed_site = { stations: [JSON.parse(JSON.stringify(x))] }
        let new_site = { ...site, ...changed_site};
        setSite(new_site)
    }

    /**
     * Function passed to child visual objects such that they can set the automation state of the current station.
     *
     * @param current_stage   The name of the stage we're changing to
     */
    function setCurrentAutomationStageFromChild(current_stage) {
//        console.log("setCurrentAutomationStageFromChild current_stage "+current_stage)
        let cmd = {
            userid: userid,
            command: STAGE_COMMAND,
            stage_name: current_stage
        }
        changeStage(servers.api_server_host, servers.api_server_port, site.stations[currentStationIndex].stationid,site.stations[currentStationIndex].current_stage, current_stage )
        site.stations[currentStationIndex].current_stage = current_stage

        for( let i = 0; i < site.stations[currentStationIndex].attached_devices.length; i++ ) {
            cmd.deviceid = site.stations[currentStationIndex].attached_devices[i].deviceid
            sendJsonMessage(cmd)
        }
        setSite(JSON.parse(JSON.stringify(site)))
    }

    function setSelectedAutomationStageFromChild(new_selected_stage) {
        log.trace("selected stage value AthenticateApp selected_stage from "+selected_stage+" to "+new_selected_stage)
        setSelectedStage(new_selected_stage)
    }

    /**
     * Function passed to child visual objects such that they can set the automation state of the current station.
     *
     * @param new_automation_settings   An entire automation_settings to replace the current one
     *
     */
    /// TODO this many API calls obviously not ideal - fix
    function setSelectedStageSettingsFromChild(new_automation_settings) {
        log.trace("setAutomationSettingsFromChild "+JSON.stringify(new_automation_settings))
        saveAutomationSettings(servers.api_server_host, servers.api_server_port, site.userid,
            site.stations[currentStationIndex].stationid,
            new_automation_settings.stage_name,
            new_automation_settings)
        setSelectedAutomationSettings(new_automation_settings )
    }

    /**
     * Function passed to child visual objects such that they can set the automation state of the current station.
     *
     * @param stagename The name of the stage we're updating
     * @param new_automation_settings   The entire stage
     */
    /// TODO this many API calls obviously not ideal - fix
    function updateStageFromChild(stagename, new_automation_settings) {
        log.trace("updateStageFromChild "+JSON.stringify(new_automation_settings))
        let x = JSON.parse(JSON.stringify(site))
        x.stations[currentStationIndex].automation_settings = new_automation_settings
        setSite(x)
    }


    /**
     * Function passed to child visual objects such that they can set the state of a controllable switch on a device.
     *
     * @param x ???
     * @param switch_name   The name of the switch we're changing the state of
     * @param on    True/false on/off
     */
    function setSwitchStateFromChild(x, switch_name, on) {
        log.trace("setSwitchStateFromChild "+switch_name +","+on)
        let new_switch_state = JSON.parse(JSON.stringify(switch_state))
        let sw_name = switch_name
        if (switch_name === types.switch_name.growLight) {
            sw_name = types.switch_name.lightBloom
        }
        if (typeof new_switch_state[switch_name] === 'undefined') {
            console.error("button: bad switch_name " + switch_name)
            return
        }
        new_switch_state[switch_name].changing = true
        new_switch_state[switch_name].on = on
        setSwitchState(new_switch_state)

        let cmd = {
            userid: userid,
            command: SWITCH_COMMAND,
            switch_name: sw_name,
            on: on
        }
        log.trace("sendJsonMessage ???? "+sw_name+" from userid/deviceid "+cmd.userid+"/"+cmd.deviceid)
        for( let i = 0; i < site.stations[currentStationIndex].attached_devices.length; i++ ) {
            cmd.deviceid = site.stations[currentStationIndex].attached_devices[i].deviceid
            log.trace("sendJsonMessage "+sw_name+" from userid/deviceid "+cmd.userid+"/"+cmd.deviceid)
            sendJsonMessage(cmd)
        }
    }

    const applyMapChange = (value) => {
        log.trace("button: AuthenticatedApp applyMapChange "+JSON.stringify(value));
        /// TODO FINISH!
    }

    /**
     * Apply a font-family change from the display settings screen
     *
     * @param value the name of the new font-family
     */
    const applyFontChange = (value) => {
        let x = JSON.parse(JSON.stringify(bubbles_theme));
        log.trace("button: AuthenticatedApp applyFontChange from " + bubbles_theme.global.font.family + " to " + current_font + " value " + value)
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
            let z = await getSite(servers.api_server_host, servers.api_server_port, site.siteid)
//            log.trace("useEffect stationid = " + z.stations[0].stationid)
//            log.info("useEffect " + JSON.stringify(z))
            z.stations[0].automation_settings = z.stations[0].automation_settings[0] // returned as array from server

            setSite(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    }, [nodeEnv])     // eslint-disable-line react-hooks/exhaustive-deps
    // ONLY CALL ON MOUNT - empty array arg causes this


    /**
     * Set the local state values that control what this app displays based on the NODE_ENV.
     *
     * @param value The value of NODE_ENV
     */
    let setEnvironment = (value) => {
        log.trace("button: AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        servers = util.get_server_ports_for_environment(props.nodeEnv)
        log.trace("button: setting state db to " + theNodeEnvironment + " port to " + servers.api_server_port)
        setSocketUrl('ws://' + servers.websocket_server_host + ':' + servers.websocket_server_port)
        setNodeEnv(theNodeEnvironment);
        setApiPort(servers.api_server_port);
    }

    log.trace("AuthenticatedApp Rendering App with props = " + JSON.stringify(props))
    // reset tilt if older than 30 seconds
    if (tilt.currently_tilted) {
        let now = moment().unix()
        if (now - tilt.last_tilt > 30) {
            log.trace("turning currently_tilted off because 30 seconds have expired")
            setTilt({ currently_tilted: false, last_tilt: 0 })
        }
    }
//    let merged_theme = deepMerge(grommet, bubbles_theme)
//    setBubblesTheme(JSON.parse(JSON.stringify(merged_theme)))
    if (lastJsonMessage !== null && typeof (lastJsonMessage.status) !== 'undefined' && lastJsonMessage.status !== null) {
        lastCompleteStatusMessage = JSON.parse(JSON.stringify(lastJsonMessage))
    } else {
        if (lastJsonMessage !== null && typeof (lastJsonMessage.message_type) !== 'undefined' && lastJsonMessage.message_type !== null &&
            lastJsonMessage.message_type === types.message_type.measurement) {
//            log.debug("msg: Last json message was a measurement " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
            processMeasurementMessage(lastJsonMessage)
        } else {
//            log.warn("msg: Last json message not a measurement! " + (lastJsonMessage ? JSON.stringify(lastJsonMessage) : 'null'))
        }
    }

    let thestate = JSON.parse(JSON.stringify(local_state))
//    console.log("thestate = " + JSON.stringify(thestate))

    if (typeof (lastCompleteStatusMessage) !== 'undefined' && lastCompleteStatusMessage !== null) {
        thestate = JSON.parse(JSON.stringify(lastCompleteStatusMessage))
    }

    /** TODO fix this - needed for sidebar
     *
     * @type {string}
     */
    site.site_name = props.site.stations[props.stationindex].site_name
    site.siteid = props.site.stations[props.stationindex].siteid

//    thestate.station_settings = props.site.stations[props.stationindex]
//    console.log("STATION: site " + JSON.stringify(site))
/*
            <Sidebar gridArea="sidebar" background="#477CBC" round="small"
                     header={
                         <Avatar src="//s.gravatar.com/avatar/03e2a5b132702f8c65e793b743be4418?s=80"/>
                     }
                     footer={
                         <Button icon={<Help/>} hoverIndicator/>
                     }>
                <Nav gap="small">
                    <Text >{site.stations[currentStationIndex].station_name}</Text>
                    <RenderSiteStationMenu currentStationIndex={currentStationIndex}
                                           site={site}
                                           setCurrentStationIndex={setStation}/>
                </Nav>
            </Sidebar>
 */
    log.info("rendering with station = "+JSON.stringify(site.stations[currentStationIndex]))
    log.trace("rendering AA with selected_automation_settings="+JSON.stringify(selected_automation_settings))
    for ( let i = 0; i < site.stations[0].attached_devices.length; i++ ) {
        log.info("RenderCameraTab AuthApp attached_devices[" + i + "].latest_picture_filename = " + site.stations[0].attached_devices[i].latest_picture_filename)
    }
    log.info("AuthenticatedApp display_settings.co2_units = " + props.display_settings.co2_units)

    let millis_in_a_week = 1000 * 60 * 60 * 24 *7
    let elapsed_millis = moment.now() - props.site.stations[props.stationindex].crop.startdatetime_millis
    let CropWeek = 1+Math.floor(elapsed_millis/millis_in_a_week)

    return <div className="App">
        <Header tilt={tilt.currently_tilted} siteName={props.site.stations[props.stationindex].site_name}
                setNodeEnv={setEnvironment}
                station={site.stations[currentStationIndex]} nodeEnv={nodeEnv} readyState={readyState}
                handleClickSendMessage={handleClickSendMessage}
                logout={props.logout}
                CropWeek={CropWeek}
                    />
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
                    onChange={updateNewName}
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
                {name: 'main', start: [0, 0], end: [0, 0]},
            ]}
            columns={['xlarge']}
            rows={['800px']}
            gap={"small"}
        >

            <Tabs gridArea="main" margin="medium" flex="shrink">
                <Tab title="Station Control">
                    <RenderControlTab nodeEnv={nodeEnv}
                                      apiPort={apiPort}
                                      theme={bubbles_theme}
                                      station={site.stations[currentStationIndex]}
                                      state={thestate}
                                      switch_state={switch_state}
                                      sensor_readings = {sensor_readings}
                                      setStateFromChild={setSwitchStateFromChild}
                                      setCurrentStage={setCurrentAutomationStageFromChild}
                                      display_settings={props.display_settings}
                                      because={because}
                    />
                </Tab>
                <Tab title="Look Inside">
                    <RenderCameraTab nodeEnv={nodeEnv}
                                     apiPort={apiPort}
                                     theme={bubbles_theme}
                                     station={site.stations[currentStationIndex]}
                                     lastpicture={last_picture}
                                     onFontChange={applyFontChange}
                                     takeAPicture={takeAPicture}
                    />
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv}
                                     apiPort={apiPort}
                                     theme={bubbles_theme}
                                     sensor_readings = {sensor_readings}
                                     station={site.stations[currentStationIndex]}
                                     display_settings={props.display_settings}
                                     automation_settings={props.automation_settings}
                                     various_dates={various_dates}
                    />
                </Tab>
                <Tab title="Station Setup">
                    <RenderSettings saveSetting={saveSetting}
                                    nodeEnv={nodeEnv}
                                    apiPort={apiPort}
                                    theme={bubbles_theme}
                                    station={site.stations[currentStationIndex]}
                                    display_settings={props.display_settings}
                                    setStateFromChild={setStationSettingsStateFromChild}
                    />
                </Tab>
                <Tab title="Device Map">
                    <RenderDeviceMap nodeEnv={nodeEnv}
                                     apiPort={apiPort}
                                     apiHost={servers.api_server_host}
                                     theme={bubbles_theme}
                                     onMapChange={applyMapChange}
                                     station={site.stations[currentStationIndex]}
                    />
                </Tab>
                <Tab title="Automation">
                    <RenderStageTab nodeEnv={nodeEnv}
                                    apiPort={apiPort}
                                    theme={bubbles_theme}
                                    station={site.stations[currentStationIndex]}
                                    display_settings={props.display_settings}
                                    updateStageFromChild={updateStageFromChild}
                                    setSelectedStageFromChild={setSelectedAutomationStageFromChild}
                                    setSelectedStageSettingsFromChild={setSelectedStageSettingsFromChild}
                                    automation_settings={selected_automation_settings}
                                    selected_stage={selected_stage}
                    />
                </Tab>
                <Tab title="Events">
                    <RenderEvents
                        nodeEnv={nodeEnv}
                        apiHost={servers.api_server_host}
                        apiPort={apiPort}
                        theme={bubbles_theme}
                        station={site.stations[currentStationIndex]}
                    />
                </Tab>
                <Tab title="Display Settings">
                    <RenderDisplaySettings nodeEnv={nodeEnv}
                                           apiPort={apiPort}
                                           theme={bubbles_theme}
                                           station={site.stations[currentStationIndex]}
                                           display_settings={props.display_settings}
                                           onApplyFontChange={applyFontChange}
                                           onLocalFontChange={localFontChange}
                    />
                </Tab>
                <Tab title="Nutes">
                    <RenderNutes nodeEnv={nodeEnv}
                                       apiHost={servers.api_server_host}
                                       apiPort={apiPort}
                                       theme={bubbles_theme}
                                       station={site.stations[currentStationIndex]}
                                       display_settings={props.display_settings}
                                        dispense_function={dispense}
                    />
                </Tab>
                <Tab title="Calibration">
                    <RenderCalibration nodeEnv={nodeEnv}
                                       apiHost={servers.api_server_host}
                                           apiPort={apiPort}
                                           theme={bubbles_theme}
                                           station={site.stations[currentStationIndex]}
                                           display_settings={props.display_settings}
                    />
                </Tab>
            </Tabs>
        </Grid>
    </div>
}

export default AuthenticatedApp