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
import GoogleFontLoader from "react-google-font-loader";
import {grommet} from "grommet/themes"

function RenderStatusTab (props) {

    let [values, setValues] = useState({exhaustFanOn: false, intakeFanOn: false}); //
    let [apiPort, setApiPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data
    let [themex, setThemex] = useState(props.theme ); //
    let [state, setState] = useState(props.state)
    console.log("RenderStatusTab state = "+JSON.stringify(state))

    useEffect(() => {
        console.log("RenderStatusTab useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [loading,state]);

    if (props.apiPort !== apiPort) {
        setState(props.state)
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

        ret =
            <Grommet theme={props.theme}>
                <GoogleFontLoader
                    fonts={[
                        {
                            font: props.theme.global.font.family
                        },
                    ]}
                />
                <div className="global_container_">
                    <div className="meter-group">
                        <RenderTemperatureMeter className="temp-top" label="Air Temperature" state={state}/>
                        <RenderHumidityMeter  className="temp-middle" label="Humidity"  state={state}/>
                        <RenderPressureMeter  className="temp-bottom" label="Odor Control (pressure)"  state={state}/>
                        <RenderPhMeter  className="temp-middle" label="Root pH"  state={state}/>
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus  state={state}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderStatusTab;
