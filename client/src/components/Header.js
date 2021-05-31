import React, {useState} from 'react';

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import {ReadyState} from "react-use-websocket";
import getReadyState from '../AuthenticatedApp'
import {Table, TableRow, TableCell} from 'grommet'
import log from 'roarr';
import '../logimplementation'

function Header (props) {
    log.trace("render Header with props "+JSON.stringify(props) )
    let [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState();  // The port we should send queries to - depends on dev/test/prod
//    log.trace("after useState")
    let setEnvironment = (value) => {
        log.trace("Header.setEnvironment(" + value + ")")
        var theNodeEnv = value
        let api_server_port;
        let websocket_server_port;
        switch( theNodeEnv) {
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
        setNodeEnv(theNodeEnv);
        setApiPort(api_server_port);
        props.setNodeEnv(value)
    }
//    log.trace("after setenv")
    let webSocketLabel="Ping open WebSocket"
    if( props.readyState !== ReadyState.OPEN ) {
        webSocketLabel = "WebSocket server down"
    }
//    log.trace("after websocket")
//    log.trace("Rendering header")
    return (
        <div>
            <header className="BubblesApp-header" style={{'width': '100%'}} >
                <span style={{
                    'width': '25%',
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Bubbles - {props.siteName} - ({nodeEnv}) - {props.station.current_stage}</span>
                <span style={{'width': '75%'}} >
                    <div id="animated-gif-container" />
                </span>
            </header>
                <RenderEnvironmentPickerFunctional nodeEnv={nodeEnv} apiPort={apiPort}
                                               handleClick={setEnvironment}/>
            <button onClick={props.handleClickSendMessage} disabled={props.readyState !== ReadyState.OPEN} >{webSocketLabel}</button>
            <button onClick={props.handleClickSendMessage} >{"API server"}</button>
            <button onClick={props.handleClickSendMessage} >{"ActiveMQ"}</button>
        </div>
   );
}

export default Header