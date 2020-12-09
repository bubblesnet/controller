import React, {useEffect, useState} from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";

function RenderGrowLight (props) {
    let [state,setState] = useState(props.state)
// OFF is first
    console.log("RenderGrowLight humidity = " + state.status.humidity_internal)
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="plant-height-holder" />
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_top} units={state.display_settings.temperature_units} direction={state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_middle} units={state.display_settings.temperature_units} direction={state.status.temp_air_middle_direction}/>
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_bottom} units={state.display_settings.temperature_units} direction={state.status.temp_air_bottom_direction}/>
                        </div>
                    </div>
                    <div id="humidity-holder" >
                        <RenderHygrometer currentHumidity={state.status.humidity_internal} units={state.display_settings.humidity_units} direction={state.status.humidity_internal_direction}/>
                    </div>
                </div>
        } else {
            ret =
                <div className="growlight-container-on">
                    <div className="plant-height-holder" />
                    <div className="growlight-on" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-day" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_top} units={state.display_settings.temperature_units} direction={state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_middle} units={state.display_settings.temperature_units} direction={state.status.temp_air_middle_direction} />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer currentTemperature={state.status.temp_air_bottom} units={state.display_settings.temperature_units} direction={state.status.temp_air_bottom_direction} />
                        </div>
                    </div>
                    <div id="humidity-holder" >
                        <RenderHygrometer currentHumidity={state.status.humidity_internal} units={state.display_settings.humidity_units} direction={state.status.humidity_internal_direction}/>
                    </div>
                </div>
        }
    return (ret)
}

export default RenderGrowLight;



