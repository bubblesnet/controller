// import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import React, { useEffect, useState } from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
import RenderUserSetupTab from "./components/ServerSettingsTab/UserSetupTabFunctional"

import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
// import {useIntl} from 'react-intl'

import initial_state from './initial_station_state.json'
import util from "./util";

function SetupApp (props) {

    //Public API that will echo messages sent to it back to the client
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    const [adminUser, setAdminUser] = useState({})

    let servers = util.get_server_ports_for_environment(nodeEnv)


    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    const [local_state, setState] = useState(initial_state);

    useEffect(() => {
        const fetchData = async () => {
            let x = await getAdminUser()
            setAdminUser(x)
        }
        fetchData();
    }, [nodeEnv])

    async function getAdminUser() {
        console.log("getAdminUser calling out to api for deets")

        return new Promise( async (resolve, reject) => {
            console.log(`getAdminUser calling out to http://${servers.api_server_host}:${servers.api_server_port}/users/name/admin`)
            const response = fetch(`http://${servers.api_server_host}:${servers.api_server_port}/api/users/name/admin`).then( async function(response) {
                if (response.ok) {
                    console.log("getAdminUser Got user response.ok");
                    let user = await response.json();
                    console.log("getAdminUser Got user " + JSON.stringify(user));
                    resolve(user)
                } else {
                    console.log("getAdminUser error " + response.status)
                    reject(response.status)
                }
            }).catch( function(err) {
                console.log(err)
            });
        })
    }

    let setEnvironment = (value) => {
        console.log("AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        console.log("setting environment to " + theNodeEnvironment )
        setNodeEnv(theNodeEnvironment);
    }

    console.log("SetupApp Rendering App with readyState = " )
    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment}/>
                <Tabs margin="medium" flex="shrink">
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={servers.api_server_port} theme={bubbles_theme}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                    <Tab title="Admin User">
                        <RenderUserSetupTab nodeEnv={nodeEnv} apiPort={servers.api_server_port} theme={bubbles_theme}
                                     applicationSettings={local_state.application_settings}
                        username='admin' email={adminUser.email} firstName={adminUser.firstname} lastName={adminUser.lastname}/>
                    </Tab>
                </Tabs>
        </div>
    );
}

export default SetupApp