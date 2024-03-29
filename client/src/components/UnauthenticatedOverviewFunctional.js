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

import {useState} from 'react';
import React from 'react'
import '../App.css';
import {Button} from "rendition";
import {Text, Box, TextInput, Markdown} from "grommet";
import util from "../util";
import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function RenderUnauthenticatedOverview (props) {

    const md = `
### Bubbles Controller
Enter your username and password to start configuring and controlling your Bubbles installation.
                        
Click here to see first-time setup instructions.
`;
    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    async function loginUser(credentials) {
        log.trace("loginUser env=("+props.nodeEnv+") calling out to api on port "+servers.api_server_port+" for token")
        let url = 'http://'+servers.api_server_host+':'+servers.api_server_port+'/api/auth/login'
        log.trace("url = " + url)
        log.trace("creds = " + JSON.stringify(credentials))
        return new Promise( async (resolve, reject) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if(response.ok) {
                let loginstate = await response.json();
                log.trace("Got loginstate " + JSON.stringify(loginstate));
                resolve(loginstate)
            } else {
                log.trace("error " + response.status)
                reject( response.status )
            }
        })
    }

    const [username, setUserName] = useState();
    const [password, setPassword] = useState("");   // Set to a value so that controlled-uncontrolled error doesn't get thrown
    const [failed, setFailed] = useState(false);

    const handleSubmit = async e => {
        /*
                e.preventDefault();
        */
        log.trace("handleSubmit - calling out for token for user "+username)
        /// TODO this hardwired port number is because api_server_port is showing up undefined here!
        await loginUser( {
            username: username,
            password: password
        })
            .then((loginstate) =>{
                log.trace("Calling set token with " + loginstate.token)
                loginstate.auth=true;
                props.processLoginResult(loginstate);   // Will re-render grandparent
            })
            .catch((err) => {
                log.trace("login failed = " + err)
                /// TODO if processlogin rerenders grandparent, these 2 rerenders are not helpful
                setFailed(true)
                setPassword("")
                props.processLoginResult({auth: false});
            });
    };

    let login_status = <Box><Text>login failed</Text></Box>
    if( !failed ) {
        login_status = <></>
    }

    let ret =
        <Box direction="column" >
            <form  onSubmit={handleSubmit}>
            <Box direction="row" margin="xlarge" >
                <Box round="small" direction="column" background="#aabbff">
                    <Box gap="xlarge">
                      <Box margin="large" direction="column" gap="medium" width="medium" >
                          <Text size="xlarge">Username:</Text>
                          <Box>
                              <TextInput defaultValue={username} onChange={e => setUserName(e.target.value)}/>
                          </Box>
                          <Text size="xlarge">Password:</Text>
                          <Box gap="small">
                              <TextInput type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
                              <Button alignSelf="center"

                                      width={'medium'} round={'large'}
                                      active={true}
                                      onClick={handleSubmit} label={"Log in"} />
                          </Box >
                          {login_status}
                      </Box>
                    </Box>
                </Box>
                <Box margin="medium">
                    <Markdown  children={md}>
                     </Markdown>
                </Box>
            </Box>
            </form>
        </Box>
    return (ret);
}

export default RenderUnauthenticatedOverview;
