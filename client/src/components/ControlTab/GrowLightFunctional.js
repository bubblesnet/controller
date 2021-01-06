import React from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";

function RenderGrowLight (props) {
    console.log("RenderGrowLight humidity = " + props.state.status.humidity_internal)
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="plant-height-holder" />
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_top} currentTemperature={props.state.status.temp_air_top} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_middle} currentTemperature={props.state.status.temp_air_middle} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_middle_direction}/>
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_bottom} currentTemperature={props.state.status.temp_air_bottom} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_bottom_direction}/>
                        </div>
                    </div>
                    <div id="humidity-holder" >
                        <RenderHygrometer exists={props.state.cabinet_settings.humidity_sensor} currentHumidity={props.state.status.humidity_internal} units={props.settings.display_settings.humidity_units} direction={props.state.status.humidity_internal_direction}/>
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
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_top}  currentTemperature={props.state.status.temp_air_top} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_middle}  currentTemperature={props.state.status.temp_air_middle} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_middle_direction} />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.state.cabinet_settings.thermometer_bottom}  currentTemperature={props.state.status.temp_air_bottom} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_bottom_direction} />
                        </div>
                    </div>
                    <div id="humidity-holder" >
                        <RenderHygrometer exists={props.state.cabinet_settings.humidity_sensor} currentHumidity={props.state.status.humidity_internal} units={props.settings.display_settings.humidity_units} direction={props.state.status.humidity_internal_direction}/>
                    </div>
                </div>
        }
    return (ret)
}

export default RenderGrowLight;



