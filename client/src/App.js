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

import * as React from 'react'
//import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import SetupApp from './SetupApp'

import useToken from './useToken';
import {useEffect, useState} from "react";
import {getSite} from "./api/utils";

import util from "./util";

import initial_display_settings from './initial_display_settings.json'
import options_units from './options_units.json'
import options_pressure_units from './options_pressure_units.json'
import options_enclosure from './options_enclosure.json'
import options_language from './options_languages.json'

import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22



let necessary_environment = [
    {name: "NODE_ENV", value: process.env.NODE_ENV},
    {name: "REACT_APP_NODE_ENV", value: process.env.REACT_APP_NODE_ENV},
    {name: "REACT_APP_API_PORT", value: process.env.REACT_APP_API_PORT},
    {name: "REACT_APP_API_HOST", value: process.env.REACT_APP_API_HOST}

]
function App(props) {

    log.info("ENV = " + JSON.stringify(process.env))

        let initial_station_state = {
            station_settings: {
                station_name: "blah",
                time_between_pictures_in_seconds: 6000,
                time_between_sensor_polling_in_seconds: 3000,
                humidifier: true,
                humidity_sensor_internal: true,
                humidity_sensor_external: true,
                heater: true,
                thermometer_top: true,
                thermometer_middle: true,
                thermometer_bottom: true,
                thermometer_external: true,
                thermometer_water: true,
                water_pump: true,
                air_pump: true,
                station_door_sensor: true,
                outer_door_sensor: true,
                movement_sensor: true,
                pressure_sensors: true,
                root_ph_sensor: true,
                enclosure_type: "Cabinet",
                water_level_sensor: true,
                tub_depth: 18.0,
                tub_volume: 20.0,
                intake_fan: true,
                exhaust_fan: true,
                heat_lamp: true,
                heating_pad: true,
                light_sensor_internal: true,
                light_sensor_external: true,
                light_bloom: true,
                light_vegetative: true,
                light_germinate: true
            }
        }

        let initial_sensor_readings = {
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
            start_date_current_stage: "25 days ago",
            start_date_next_stage: "10 days from now",
            outer_door_open: false,
            station_door_open: false,
            pressure_external: 0.0,
            pressure_internal: 0.0,
            pressure_external_direction: "",
            pressure_internal_direction: "",
            date_last_training: "never",
            date_last_filter_change: "never",
            water_level: 0.0
        }

        let initial_switch_state = {
            automaticControl: {
                on: false,
                changing: true
            },
            heatLamp: {
                on: false,
                changing: true
            },
            heatingPad: {
                on: false,
                changing: true
            },
            lightVegetative: {
                on: false,
                changing: true
            },
            lightBloom: {
                on: false,
                changing: true
            },
            humidifier: {
                on: false,
                changing: true
            },
            waterHeater: {
                on: false,
                changing: true
            },
            heater: {
                on: false,
                changing: true
            },
            airPump: {
                on: false,
                changing: true
            },
            waterPump: {
                on: false,
                changing: true
            },
            intakeFan: {
                on: false,
                changing: true
            },
            exhaustFan: {
                on: false,
                changing: true
            },
            currentGrowLight: {
                on: false,
                changing: true
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

    const [site, setSite] = useState({});

    log.info("App.js NODE_ENV = " + process.env.NODE_ENV+" REACT_APP_NODE_ENV = " + process.env.REACT_APP_NODE_ENV)
    let servers = util.get_server_ports_for_environment(process.env.REACT_APP_NODE_ENV)
    let needs_setup = false

    const { token, setToken } = useToken();

    function processLoginResult(loginResult) {
        log.debug("App: processLoginResult "+JSON.stringify(loginResult))
        if(loginResult.auth === true ) {
            log.debug("Setting token to " + JSON.stringify(loginResult))
            loginResult.units_options = options_units
            loginResult.pressure_units_options = options_pressure_units
            loginResult.languageOptions = options_language
            loginResult.enclosure_options = options_enclosure
            setToken(loginResult)  // this inspires the rerender that gets us the authenticatedApp

//            setLocalToken(loginResult.token)
        }
    }
    function doLogout() {
        setToken({auth:false})
    }

    useEffect(() => {
        const fetchData = async () => {
            log.debug("selected stage value fetching")
            let z = await getSite(servers.api_server_host, servers.api_server_port, 1)
            log.info("zzzzz = " + JSON.stringify(z))
            setSite(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    },[]);    // eslint-disable-line react-hooks/exhaustive-deps
    // ONLY CALL ON MOUNT - empty array arg causes this

//    log.info("App: Rendering App with token set to " + JSON.stringify(token))
    if( needs_setup ) {
        return <SetupApp readyState={true}/>
    }

    let selectedStationIndex = 0

//    log.info("App: Rendering App with site set to " + JSON.stringify(site))
    if( typeof site.stations === 'undefined') {
        return <></>
    }
    initial_station_state.station_settings.display_settings = initial_display_settings
/*    if(typeof site.automation_settings != 'undefined') {
        site.automation_settings = site.automation_settings[0] // returned as array from server
    } else {
        site.automation_settings = {}
    }
 */
    log.info("hostname = " + window.location.hostname)
    log.info(JSON.stringify(site))
    let missing_var = ""
    function configured() {
        log.info("checking ENV " + JSON.stringify(process.env))
        for(let i = 0; i < necessary_environment.length; i++ ) {
            if (typeof (necessary_environment[i].value) === 'undefined') {
                log.info("undefined "+necessary_environment[i].name)
                missing_var = necessary_environment[i].name
                return false
            }
        }
        return(true)
    }

    for ( let i = 0; i < site.stations[0].attached_devices.length; i++ ) {
        log.info("RenderCameraTab App attached_devices[" + i + "].latest_picture_filename = " + site.stations[0].attached_devices[i].latest_picture_filename)
    }

    let ret
    if( !configured()) {
        ret = <div className="App"><p>Incorrect configuration: {missing_var} is not defined</p><p>{JSON.stringify(process.env)}</p></div>
    } else {
        ret = (token?.auth === true) ? <AuthenticatedApp
                stationindex={selectedStationIndex}
                initial_station_state={initial_station_state}
                initial_switch_state={initial_switch_state}
               initial_sensor_readings={initial_sensor_readings}
                nodeEnv={process.env.REACT_APP_NODE_ENV}
                site={site}
                automation_settings={site.stations[selectedStationIndex].automation_settings}
                display_settings={initial_station_state.station_settings.display_settings}
                user={token}
                logout={doLogout}
                setLatestPictureFromChild={setLatestPictureFromChild}
            /> :
            <UnauthenticatedApp nodeEnv={process.env.REACT_APP_NODE_ENV} processLoginResult={processLoginResult}/>
    }
    return(ret)
}

export default App