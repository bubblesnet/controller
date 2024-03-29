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

import React, {useState} from 'react';

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import RenderTiltFunctional from "./TiltFunctional"
import {ReadyState} from "react-use-websocket";
// import getReadyState from '../AuthenticatedApp'
// import {Table, TableRow, TableCell} from 'grommet'
import log from "roarr";
// import log from "./bubbles_logger"
import {Text} from 'grommet'
// import '../logimplementation'
import {Button} from "grommet";
import {get_server_ports_for_environment} from "../util";

// copyright and license inspection - no issues 4/13/22

function Header (props) {
    log.trace("render Header with props "+JSON.stringify(props) )
    let [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState();  // The port we should send queries to - depends on dev/test/prod

    let CropWeek = -1

//    console.log("xxxx " + JSON.stringify(props.station))

//    log.trace("after useState")
    let setEnvironment = (value) => {
        log.trace("Header.setEnvironment(" + value + ")")
        var theNodeEnv = value.toLowerCase()
        let api_server_port;

        setNodeEnv(theNodeEnv);
        let server_ports = get_server_ports_for_environment(value)
        setApiPort(server_ports.api_server_port);
        props.setNodeEnv(value)
    }
//    log.trace("after setenv")
    let webSocketLabel="Ping open WebSocket"
    if( props.readyState !== ReadyState.OPEN ) {
        webSocketLabel = "WebSocket server down"
    }
//    log.trace("after websocket")
//    console.log("Rendering header with station "+JSON.stringify(props.station))
    return (
        <div>
            <header className="BubblesApp-header" style={{'width': '100%'}} >
                <span  >
                    <div id="animated-gif-container" />
                </span>
                <span style={{
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Bubbles - {props.siteName} - ({nodeEnv}) - {props.station.current_stage}</span>
                <span style={{'width': '50%'}} >
                    <RenderTiltFunctional tilt={props.tilt}/>
                    <Button className='Logout-Button' color={'var(--color-button-border)'} width={'medium'} round={'large'} label={'Logout'} onClick={props.logout} />
               </span>
            </header>
                <RenderEnvironmentPickerFunctional nodeEnv={nodeEnv} apiPort={apiPort}
                                               handleClick={setEnvironment}/>
            <Text >Crop Week {props.CropWeek} </Text>
            <button onClick={props.handleClickSendMessage} disabled={props.readyState !== ReadyState.OPEN} >{webSocketLabel}</button>
            <button onClick={props.handleClickSendMessage} >{"API server"}</button>
            <button onClick={props.handleClickSendMessage} >{"ActiveMQ"}</button>
        </div>
   );
}

export default Header