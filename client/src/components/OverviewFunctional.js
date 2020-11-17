import React, {useEffect, useState} from 'react';
import '../App.css';
import '../overview_style.css'

import Loader from "./Loader";
import RenderTemperatureMeter from "./TemperatureMeterFunctional";
import RenderHumidityMeter from "./HumidityMeterFunctional";
import RenderPressureMeter from "./PressureMeterFunctional";
import RenderPhMeter from "./PhMeterFunctional";

function RenderOverview (props) {

    let [values, setValues] = useState([]); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("MetricsPanelFunctional useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
//        const timer = setTimeout(() => setLoading(true), 30000);
        if (apiPort !== props.apiPort) {
            setValues([])
        }
        if (loading) {
            getValues()
        }
//        return () => clearTimeout(timer);
        return;
    }, [loading]);

    function getValues() {
//        console.log("MetricsPanelFunctional getMetrics props = " + JSON.stringify(props))
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
                    <div className="metergroup">
                        <RenderTemperatureMeter className="temp-top" label="Air Temperature"/>
                        <RenderHumidityMeter  className="temp-middle" label="Humidity"/>
                        <RenderPressureMeter  className="temp-bottom" label="Pressure Differential"/>
                        <RenderPhMeter  className="temp-top" label="Root pH"/>
                   </div>
                    <div className="growboxgroup">
                        <div className="tub">
                            <div className="water-level-holder">
                                <p className="text-8">Water Level</p>
                            </div>
                        </div>
                        <div className="cabinet">
                            <img className="cabinet-top" src="images/cabinet_top.png" alt="" width="615" height="105" />
                                <img className="backwall" src="images/backwall.png" alt="" width="617" height="378" />
                        </div>
                        <div className="plant">
                            <div className="col">
                                <p className="yardstick">Yardstick</p>
                            </div>
                            <div className="col-2">
                                <div className="plant-holder">
                                    <p className="plant-2">Plant</p>
                                </div>
                                <div className="pot-holder">
                                    <p className="text-9">The pot</p>
                                </div>
                            </div>
                        </div>
                        <div className="growlight">
                            <p className="text-10">Grow Light</p>
                        </div>
                        <div className="fans">
                            <div className="filter-and-exhaust-fan-holder">
                                <div id= "exhaust-fan-filter" />
                                <div id="exhaust-animated-fan-container" />
                                <div id="exhaust-animated-wind-container" />
                            </div>
                            <div className="row">
                                <div className="heater">
                                    <p className="heater-2">Heater</p>
                                </div>
                                <div className="humidifier">
                                    <p className="humidifier-2">Humidifier</p>
                                </div>
                            </div>
                            <div className="input-fan-holder">
                                <div id="intake-animated-wind-container" />
                                <div id="intake-animated-fan-container" />
                            </div>
                        </div>
                        <div className="waterpump">
                            <div className="dribbler-manifold-holder">
                                <div className="text-13">
                                    <p>Drip Manifold</p>
                                </div>
                            </div>
                            <img className="manifold-spray" src="images/manifold_spray.png" alt="" width="165"
                                 height="34" />
                                <div className="water-pump-holder">
                                    <p className="text-14">Water Pump</p>
                                </div>
                        </div>
                        <div className="airpump">
                            <div className="air-pump-holder">
                                <p className="text-15">Air Pump</p>
                            </div>
                            <div className="bubble-rock-holder">
                                <p className="text-16">Bubble Rock</p>
                            </div>
                        </div>
                    </div>
                    <div className="detailgroup">
                        <div className="current-status-holder">
                            <p className="text-17">Current Status</p>
                        </div>
                        <div className="selected-detail-holder">
                            <p className="text-18">Selected Detail</p>
                        </div>
                        <div className="events-holder">
                            <p className="events">Events</p>
                        </div>
                    </div>
                </div>

            </>
    }
    return (ret)
}

export default RenderOverview;
