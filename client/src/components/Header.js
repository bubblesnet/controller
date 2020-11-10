import React, {useState} from 'react';

import {Img} from "rendition";

import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import Iceberg from '../images/bubbles.png'

function Header (props) {
    console.log("IceBreakerApp render props = " + JSON.stringify(props))
    let [database, setDatabase] = useState("production"); // The array of SingleBoardComputers
    let [port, setPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod

    let setEnvironment = (value) => {
        console.log("Header.setEnvironment(" + value + ")")
        var thedatabase = value
        var theport
        if (thedatabase === "production") {
            theport = 3001;
        } else if (thedatabase === "test") {
            theport = 3002;
        } else if (thedatabase === "development") {
            theport = 3003;
        }
        setDatabase(thedatabase);
        setPort(theport);
        props.setEnvironment(value)
    }

    return (
        <div>
             <header className="BubblesApp-header">
                <span style={{
                    'width': '25%',
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Bubbles ({database})</span>
                <span style={{'width': '50%'}}/>
                <span style={{'width': '25%'}}><Img style={{'marginRight': '25px', 'float': 'right'}}
                                                    src={Iceberg}/></span>
            </header>
            <RenderEnvironmentPickerFunctional database={database} port={port}
                                               handleClick={setEnvironment}/>
        </div>
   );
}

export default Header