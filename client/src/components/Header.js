import React, {useState} from 'react';

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import {ReadyState} from "react-use-websocket";
import getReadyState from '../AuthenticatedApp'

function Header (props) {
    console.log("header render" )
    let [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod

    let setEnvironment = (value) => {
        console.log("Header.setEnvironment(" + value + ")")
        var theNodeEnv = value
        var theApiPort
        if (theNodeEnv === "production") {
            theApiPort = 3001;
        } else if (theNodeEnv === "test") {
            theApiPort = 3002;
        } else if (theNodeEnv === "development") {
            theApiPort = 3003;
        }
        setNodeEnv(theNodeEnv);
        setApiPort(theApiPort);
        props.setNodeEnv(value)
    }

    console.log("Rendering header with getReadyState = " + getReadyState())
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
            <button onClick={props.handleClickSendMessage}
                disabled={props.readyState !== ReadyState.OPEN} >
                Ping
            </button>

        </div>
   );
}

export default Header