import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderSetup from "./components/ServerSettingsTab/ServerSettingsTabFunctional"
import RenderUserSetupTab from "./components/ServerSettingsTab/UserSetupTabFunctional"

import initial_theme from './InitialTheme.json'
import {deepMerge} from "grommet/utils"
import {grommet} from 'grommet/themes'
//import {useIntl} from 'react-intl'

import initial_state from './initial_state.json'

function SetupApp (props) {

    //Public API that will echo messages sent to it back to the client
    console.log("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    const [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    const [bubbles_theme, setBubblesTheme] = useState(deepMerge(grommet, initial_theme));
    const [adminUser, setAdminUser] = useState({})

    let api_server_port;
    let websocket_server_port;
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
            console.log("getAdminUser calling out to " + 'http://localhost:"+apiPort+"/users/name/admin')
            const response = fetch('http://localhost:"+apiPort+"/api/users/name/admin').then( async function(response) {
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
        let api_server_port;
        let websocket_server_port;
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
        console.log("setting state db to " + theNodeEnvironment + " port to " + api_server_port)
        setNodeEnv(theNodeEnvironment);
        setApiPort(api_server_port);
    }

    console.log("SetupApp Rendering App with readyState = " )
    let thestate = local_state
    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment}/>
                <Tabs margin="medium" flex="shrink">
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={api_server_port} theme={bubbles_theme}
                                     applicationSettings={local_state.application_settings}/>
                    </Tab>
                    <Tab title="Admin User">
                        <RenderUserSetupTab nodeEnv={nodeEnv} apiPort={api_server_port} theme={bubbles_theme}
                                     applicationSettings={local_state.application_settings}
                        username='admin' email={adminUser.email} firstName={adminUser.firstname} lastName={adminUser.lastname}/>
                    </Tab>
                </Tabs>
        </div>
    );
}

export default SetupApp