import React, {useState} from 'react';

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import {ReadyState} from "react-use-websocket";
import getReadyState from '../AuthenticatedApp'
import {Table, TableRow, TableCell} from 'grommet'

function Header (props) {
    console.log("header render with props "+JSON.stringify(props) )
    let [nodeEnv, setNodeEnv] = useState(props.nodeEnv); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState();  // The port we should send queries to - depends on dev/test/prod
    console.log("after useState")
    let setEnvironment = (value) => {
        console.log("Header.setEnvironment(" + value + ")")
        var theNodeEnv = value
        var theApiPort
        if (theNodeEnv === "PRODUCTION") {
            theApiPort = 3001;
        } else if (theNodeEnv === "TEST") {
            theApiPort = 3002;
        } else if (theNodeEnv === "DEV") {
            theApiPort = 3003;
        } else if (theNodeEnv === "CI") {
            theApiPort = 3004;
        }
        setNodeEnv(theNodeEnv);
        setApiPort(theApiPort);
        props.setNodeEnv(value)
    }
    console.log("after setenv")
    let webSocketLabel="Ping open WebSocket"
    if( props.readyState !== ReadyState.OPEN ) {
        webSocketLabel = "WebSocket server down"
    }
    console.log("after websocket")
    console.log("Rendering header with getReadyState = something")
    return (
        <div>
            <header className="BubblesApp-header" style={{'width': '100%'}} >
                <span style={{
                    'width': '25%',
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Bubbles ({nodeEnv})</span>
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