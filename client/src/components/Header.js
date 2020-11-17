import React, {useState} from 'react';

import {Img} from "rendition";

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import Iceberg from '../images/bubbles.png'

function Header (props) {
    console.log("BubblesApp render props = " + JSON.stringify(props))
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
        </div>
   );
}

export default Header