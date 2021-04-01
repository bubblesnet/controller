import React from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderLightMeter from "./LightMeterFunctional";
import RenderBarometer from "./BarometerFunctional";

function RenderGrowLight (props) {
    console.log("RenderGrowLight humidity = " + props.state.status.humidity_internal)
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="pressure-holder">
                        <RenderBarometer exists={props.state.station_settings.pressure_sensors}
                                         textClassName={"pressure-text-holder"}
                                         iconClassName={"pressure-icon-holder"}
                                         value={props.state.status.pressure_internal}
                                         units={props.settings.display_settings.pressure_units}
                                         direction={props.state.status.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                        className={"light-text-holder"}
                        iconClassName={"light-icon-holder"}
                        exists={props.state.station_settings.pressure_sensors}
                        value={props.state.status.light_internal}
                        units={props.settings.display_settings.light_units}
                        direction={props.state.status.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_top} currentTemperature={props.state.status.temp_air_top} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_middle} currentTemperature={props.state.status.temp_air_middle} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_middle_direction}/>
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_bottom} currentTemperature={props.state.status.temp_air_bottom} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_bottom_direction}/>
                        </div>
                    </div>
                        <RenderHygrometer prefix={""} exists={props.state.station_settings.humidity_sensor_internal} currentHumidity={props.state.status.humidity_internal} units={props.settings.display_settings.humidity_units} direction={props.state.status.humidity_internal_direction}/>
                </div>
        } else {
            ret =
                <div className="growlight-container-on">
                    <div className="pressure-holder">
                    <RenderBarometer exists={props.state.station_settings.pressure_sensors}
                                     textClassName={"pressure-text-holder"}
                                     iconClassName={"pressure-icon-holder"}
                                     value={props.state.status.pressure_internal}
                                     units={props.settings.display_settings.pressure_units}
                                     direction={props.state.status.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                            className={"light-text-holder"}
                            iconClassName={"light-icon-holder"}
                            exists={props.state.station_settings.pressure_sensors}
                            value={props.state.status.light_internal}
                            units={props.settings.display_settings.light_units}
                            direction={props.state.status.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-on" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-day" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_top}  currentTemperature={props.state.status.temp_air_top} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_middle}  currentTemperature={props.state.status.temp_air_middle} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_middle_direction} />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.state.station_settings.thermometer_bottom}  currentTemperature={props.state.status.temp_air_bottom} units={props.settings.display_settings.temperature_units} direction={props.state.status.temp_air_bottom_direction} />
                        </div>
                    </div>
                    <RenderHygrometer prefix={""} exists={props.state.station_settings.humidity_sensor_internal} currentHumidity={props.state.status.humidity_internal} units={props.settings.display_settings.humidity_units} direction={props.state.status.humidity_internal_direction}/>
                </div>
        }
    return (ret)
}

export default RenderGrowLight;



