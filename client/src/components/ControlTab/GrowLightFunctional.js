import React from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderLightMeter from "./LightMeterFunctional";
import RenderBarometer from "./BarometerFunctional";

function RenderGrowLight (props) {
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="pressure-holder">
                        <RenderBarometer exists={props.station.pressure_sensors}
                                         textClassName={"pressure-text-holder"}
                                         iconClassName={"pressure-icon-holder"}
                                         value={props.sensor_readings.pressure_internal}
                                         units={props.display_settings.pressure_units}
                                         direction={props.sensor_readings.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                        className={"light-text-holder"}
                        iconClassName={"light-icon-holder"}
                        exists={props.station.pressure_sensors}
                        value={props.sensor_readings.light_internal}
                        units={props.display_settings.light_units}
                        direction={props.sensor_readings.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.station.thermometer_top}
                                               currentTemperature={props.sensor_readings.temp_air_top}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.station.thermometer_middle}
                                               currentTemperature={props.sensor_readings.temp_air_middle}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_middle_direction}/>
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.station.thermometer_bottom}
                                               currentTemperature={props.sensor_readings.temp_air_bottom}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_bottom_direction}/>
                        </div>
                    </div>
                        <RenderHygrometer prefix={""} exists={props.station.humidity_sensor_internal}
                                          currentHumidity={props.sensor_readings.humidity_internal}
                                          units={props.display_settings.humidity_units} direction={props.sensor_readings.humidity_internal_direction}/>
                </div>
        } else {
            ret =
                <div className="growlight-container-on">
                    <div className="pressure-holder">
                    <RenderBarometer exists={props.station.pressure_sensors}
                                     textClassName={"pressure-text-holder"}
                                     iconClassName={"pressure-icon-holder"}
                                     value={props.sensor_readings.pressure_internal}
                                     units={props.display_settings.pressure_units}
                                     direction={props.sensor_readings.pressure_internal_direction} />
                    </div>
                    <RenderLightMeter
                            className={"light-text-holder"}
                            iconClassName={"light-icon-holder"}
                            exists={props.station.pressure_sensors}
                            value={props.sensor_readings.light_internal}
                            units={props.display_settings.light_units}
                            direction={props.sensor_readings.light_internal_direction}/>
                    <div className="plant-height-holder" />
                    <div className="growlight-on" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-day" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer exists={props.station.thermometer_top}
                                               currentTemperature={props.sensor_readings.temp_air_top}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_top_direction}/>
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer exists={props.station.thermometer_middle}
                                               currentTemperature={props.sensor_readings.temp_air_middle}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_middle_direction} />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer exists={props.station.thermometer_bottom}
                                               currentTemperature={props.sensor_readings.temp_air_bottom}
                                               units={props.display_settings.temperature_units} direction={props.sensor_readings.temp_air_bottom_direction} />
                        </div>
                    </div>
                    <RenderHygrometer prefix={""} exists={props.station.humidity_sensor_internal}
                                      currentHumidity={props.sensor_readings.humidity_internal}
                                      units={props.display_settings.humidity_units} direction={props.sensor_readings.humidity_internal_direction}/>
                </div>
        }
    return (ret)
}

export default RenderGrowLight;



