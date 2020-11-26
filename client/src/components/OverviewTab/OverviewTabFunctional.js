import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'

import Loader from "../Loader";
import RenderTemperatureMeter from "../ControlTab/TemperatureMeterFunctional";
import RenderHumidityMeter from "../ControlTab/HumidityMeterFunctional";
import RenderPressureMeter from "../ControlTab/PressureMeterFunctional";
import RenderPhMeter from "../ControlTab/PhMeterFunctional";
import RenderStatus from "../ControlTab/StatusFunctional";

function RenderOverviewTab (props) {

    let [values, setValues] = useState({exhaustFanOn: false, intakeFanOn: false}); //
    let [apiPort, setApiPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
        const timer = setTimeout(() => setLoading(true), 120000);
        if (apiPort !== props.apiPort) {
            setValues({exhaustFanOn: true, intakeFanOn: true})
            setLoading(false)
        }
        if (loading) {
 //           setValues({exhaustFanOn: !values.exhaustFanOn, intakeFanOn: !values.intakeFanOn})
            setLoading(false)
        }
        return () => clearTimeout(timer);
    }, [loading]);

    function getValues() {
//        console.log("RenderOverview getValues props = " + JSON.stringify(props))
        if ((props && (props.apiPort !== apiPort)) || loading) {
            loading = true
            setApiPort(props.apiPort)
            fetch('http://localhost:' + props.apiPort + '/metrics/all')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    setValues(JSON.parse(data))
//                    console.log("setLoading 5")
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                    if (loading === true) {
//                        console.log("setLoading 6")
                        setLoading(false)
                    }
                });
        }
    }

    if (props.apiPort !== apiPort) {
        setValues([])         // Clear out sbcs so that this render doesn't rerender invalid data
        setApiPort(props.apiPort)       // Set the port
//        console.log("setLoading 10")
        setLoading(true)    // Trigger another fetch and render
        return (
            <div>
                <Loader/>
            </div>
        )
    }
    let ret = ""

    if (loading) {
         ret =
            <div>
                <Loader/>
             <div >
                 <p>unimplemented</p>
            </div>
        </div>

    } else {
        ret =
            <>
                <div className="global_container_">
                    <div id="metergroup">
                        <RenderTemperatureMeter className="temp-top" label="Air Temperature"/>
                        <RenderHumidityMeter  className="temp-middle" label="Humidity"/>
                        <RenderPressureMeter  className="temp-bottom" label="Odor Control (pressure)"/>
                        <RenderPhMeter  className="temp-middle" label="Root pH"/>
                   </div>
                    <div className="detailgroup">
                        <div className="current-status-holder">
                            <RenderStatus />
                        </div>
                    </div>
                </div>

            </>
    }
    return (ret)
}

export default RenderOverviewTab;
