import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet} from 'grommet'
import Loader from "../Loader";
import RenderTemperatureMeter from "./TemperatureMeterFunctional";
import RenderHumidityMeter from "./HumidityMeterFunctional";
import RenderPressureMeter from "./PressureMeterFunctional";
import RenderPhMeter from "./PhMeterFunctional";
import RenderTextStatus from "./TextStatusFunctional";

function RenderStatusTab (props) {

    let [values, setValues] = useState({exhaustFanOn: false, intakeFanOn: false}); //
    let [apiPort, setApiPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data
    let [themex, setThemex] = useState(props.theme ); //

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
    /*

    */
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
            <Grommet theme={themex}>
                <div className="global_container_">
                    <div className="meter-group">
                        <RenderTemperatureMeter className="temp-top" label="Air Temperature"/>
                        <RenderHumidityMeter  className="temp-middle" label="Humidity"/>
                        <RenderPressureMeter  className="temp-bottom" label="Odor Control (pressure)"/>
                        <RenderPhMeter  className="temp-middle" label="Root pH"/>
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus />
                    </div>
                </div>
            </Grommet>
    }
    return (ret)
}

export default RenderStatusTab;
