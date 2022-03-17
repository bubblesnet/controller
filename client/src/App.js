import * as React from 'react'
//import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import SetupApp from './SetupApp'

import useToken from './useToken';
import {useEffect, useState} from "react";
import {getSite, getUser} from "./api/utils";
import log from "roarr";
import util from "./util";

import initial_display_settings from './initial_display_settings.json'
import initial_station_state from './initial_station_state.json'
import initial_automation_settings from './initial_automation_settings.json'
import initial_station_settings from './initial_station_settings.json'

/** Fake login function
 *
 * @param e not used
 */
/*
function setSuccessfulLogin(e) {
    console.log("successfulLogin");
    login(e)
}

 */
/*
function getToken() {
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function setToken(loginResult) {
        sessionStorage.setItem('token', JSON.stringify(loginResult.token));
}

 */

function App(props) {
    console.log("App: Starting App")

    const [site, setSite] = useState({});
    const [user, setUser] = useState({});

    let servers = util.get_server_ports_for_environment(props.nodeEnv)
    let needs_setup = false

    const { token, setToken } = useToken();

    function processLoginResult(loginResult) {
        console.log("App: processLoginResult "+JSON.stringify(loginResult))
        if(loginResult.auth === true ) {
            console.log("Setting token to " + JSON.stringify(loginResult))
            setToken(loginResult)  // this inspires the rerender that gets us the authenticatedApp

//            setLocalToken(loginResult.token)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("App: initial fetchData")
            let z = {}
            z.stations = await getSite(servers.api_server_host, servers.api_server_port, 1)
//            z.initial_state = imported_state

            console.log("App: useEffect fetchData initial_data = " + JSON.stringify(z.stations))
            console.log("App: setting site to " + JSON.stringify(z))
            setSite(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    }, [])

    console.log("App: Rendering App with token set to " + JSON.stringify(token))
    if( needs_setup ) {
        return <SetupApp readyState={true}/>
    }

    let selectedStationIndex = 0

    console.log("App: Rendering App with site set to " + JSON.stringify(site))
    if( typeof site.stations === 'undefined') {
        return <></>
    }
    initial_station_state.station_settings.display_settings = initial_display_settings
    token.units_options = [
        "IMPERIAL",
        "METRIC"
    ]
    token.pressure_units_options = [
        "hPa",
        "mbar",
        "mm Hg",
        "psi"
    ]
    token.languageOptions = [
        "en-us",
        "fr"
    ]
    token.enclosure_options = [
        "Cabinet",
        "Tent"
    ]


    return (token?.auth === true) ? <AuthenticatedApp
                                                      stationindex={selectedStationIndex}
                                                      initial_station_state={initial_station_state}
                                                      nodeEnv={process.env.REACT_APP_NODE_ENV}
                                                      site={site}
                                                      automation_settings={initial_automation_settings}
                                                      display_settings={token}
                                                      user={token}
                                    /> :
        <UnauthenticatedApp nodeEnv={process.env.REACT_APP_NODE_ENV} processLoginResult={processLoginResult}/>
}

export default App