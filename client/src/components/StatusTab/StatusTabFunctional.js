import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet} from 'grommet'
import RenderTemperatureMeter from "./TemperatureMeterFunctional";
import RenderHumidityMeter from "./HumidityMeterFunctional";
import RenderPressureMeter from "./PressureMeterFunctional";
import RenderPhMeter from "./PhMeterFunctional";
import RenderTextStatus from "./TextStatusFunctional";
import GoogleFontLoader from "react-google-font-loader";

function RenderStatusTab (props) {

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
                        <RenderTemperatureMeter
                                                sensor_readings={props.sensor_readings}
                                                station_settings={props.station}
                                                display_settings={props.display_settings}
                                                automation_settings={props.station.automation_settings}
                                                exists={props.station.temp_air_middle}
                                                className="temp-top" label="Air Temperature"
                                                />
                        <RenderHumidityMeter
                                             sensor_readings={props.sensor_readings}
                                             display_settings={props.display_settings}
                                             automation_settings={props.station.automation_settings}
                                             exists={props.station.humidity_sensor_internal}
                                             className="temp-middle" label="Humidity"
                                             />
                        <RenderPressureMeter
                                             sensor_readings={props.sensor_readings}
                                             display_settings={props.display_settings}
                                             exists={props.station.pressure_sensors}
                                             className="temp-bottom" label="Odor Control (pressure)"
                                             />
                        <RenderPhMeter
                                       sensor_readings={props.sensor_readings}
                                       exists={props.station.root_ph_sensor}
                                       className="temp-middle" label="Root pH"
                                       />
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus
                            sensor_readings={props.sensor_readings}
                            station={props.station}
                            automation_settings={props.station.automation_settings}
                            display_settings={props.display_settings}
                            settings={props.station}
                            state={props.state}
                            various_dates={props.various_dates}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderStatusTab;
