import React, {useState} from 'react';

import RenderTestQueueListFunctional from "./TestQueueListFunctional";
import RenderTestRunListFunctional from "./TestRunListFunctional";
import RenderMetrics from "./MetricsPanelFunctional";
import RenderSBCEditor from "./SBCEditor";
import {Tabs, Tab, Img} from "rendition";
import RenderDeviceStatusListFunctional from "./DeviceStatusListFunctional";
import RenderEnvironmentPickerFunctional from "./EnvironmentPickerFunctional"
import Iceberg from './iceberg.png'

function App (props) {
    console.log("IceBreakerApp render props = " + JSON.stringify(props))
    let [database, setDatabase] = useState("production"); // The array of SingleBoardComputers
    let [port, setPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    let [language, setLanguage] = useState("all")

    let setLang = (value) => {
        console.log("App setting lantuage to " + value)
        setLanguage(value)
    }

    let setEnvironment = (value) => {
//        console.log("setEnvironment(" + value + ")")
        var thedatabase = value
        var theport
        if (thedatabase === "production") {
            theport = 3001;
        } else if (thedatabase === "test") {
            theport = 3002;
        } else if (thedatabase === "development") {
            theport = 3003;
        }
//        console.log("setting state db to " + thedatabase + " port to " + theport)
//        console.log("IceBreakerApp render port = " + port)
        setDatabase(thedatabase);
        setPort(theport);
    }

    return (
        <div className="App">
            <header className="IcebergApp-header">
                <span style={{
                    'width': '25%',
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Icebreaker ({database})</span>
                <span style={{'width': '50%'}}/>
                <span style={{'width': '25%'}}><Img style={{'marginRight': '25px', 'float': 'right'}}
                                                    src={Iceberg}/></span>
            </header>
            <RenderEnvironmentPickerFunctional database={database} port={port}
                                               handleClick={setEnvironment}/>
            <Tabs margin="medium" flex="shrink">
                <Tab title="Metrics">
                    <RenderMetrics database={database} port={port}/>
                </Tab>
                <Tab title="Work Queue">
                    <RenderTestQueueListFunctional database={database} port={port} language={language}
                                                   onChangeLanguage={setLang}/>
                </Tab>
                <Tab title="Workers">
                    <RenderDeviceStatusListFunctional database={database} port={port}/>
                </Tab>
                <Tab title="Runs">
                    <RenderTestRunListFunctional database={database} port={port}/>
                </Tab>
                <Tab title="SBC Targets">
                    <RenderSBCEditor database={database} port={port} blah={"blahblah"}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default App