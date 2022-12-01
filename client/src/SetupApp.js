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
import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function SetupApp (props) {

    //Public API that will echo messages sent to it back to the client
    log.trace("AuthenticatedApp rendering with props = " + JSON.stringify(props))
    const [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    const [bubbles_theme] = useState(deepMerge(grommet, initial_theme));
    const [adminUser, setAdminUser] = useState({})

    let servers = util.get_server_ports_for_environment(nodeEnv)

    initial_state.theme = bubbles_theme;
    initial_state.current_font = bubbles_theme.global.font.family;

    useEffect(() => {
        const fetchData = async () => {
            let x = await getAdminUser()
            setAdminUser(x)
        }
        fetchData();
    },[])  // eslint-disable-line react-hooks/exhaustive-deps

    async function getAdminUser() {
        log.trace("getAdminUser calling out to api for deets")

        return new Promise( async (resolve, reject) => {
            log.trace(`getAdminUser calling out to http://${servers.api_server_host}:${servers.api_server_port}/users/name/admin`)
            const response = fetch(`http://${servers.api_server_host}:${servers.api_server_port}/api/users/name/admin`).then( async function(response) {
                if (response.ok) {
                    log.trace("getAdminUser Got user response.ok");
                    let user = await response.json();
                    log.trace("getAdminUser Got user " + JSON.stringify(user));
                    resolve(user)
                } else {
                    log.trace("getAdminUser error " + response.status)
                    reject(response.status)
                }
            }).catch( function(err) {
                log.trace(err)
            });
            log.trace("fetch response " + response)
        })
    }

    let setEnvironment = (value) => {
        log.trace("AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        log.trace("setting environment to " + theNodeEnvironment )
        setNodeEnv(theNodeEnvironment);
    }

    log.trace("SetupApp Rendering App with readyState = " )
    return (
        <div className="App">
                <Header setNodeEnv={setEnvironment}/>
                <Tabs margin="medium" flex="shrink">
                    <Tab title="Server Settings">
                        <RenderSetup nodeEnv={nodeEnv} apiPort={servers.api_server_port} theme={bubbles_theme}
                                     />
                    </Tab>
                    <Tab title="Admin User">
                        <RenderUserSetupTab nodeEnv={nodeEnv} apiPort={servers.api_server_port} theme={bubbles_theme}
                        username='admin' email={adminUser.email} firstName={adminUser.firstname} lastName={adminUser.lastname}/>
                    </Tab>
                </Tabs>
        </div>
    );
}

export default SetupApp