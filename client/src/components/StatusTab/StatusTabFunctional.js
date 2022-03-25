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
                        <RenderTemperatureMeter settings={props.settings}
                                                station_settings={props.station_settings}
                                                display_settings={props.display_settings}
                                                automation_settings={props.station.automation_settings}
                                                exists={props.settings.temp_air_middle}
                                                className="temp-top" label="Air Temperature" state={props.state}/>
                        <RenderHumidityMeter settings={props.settings}
                                             station_settings={props.station_settings}
                                             display_settings={props.display_settings}
                                             automation_settings={props.station.automation_settings}
                                             exists={props.settings.humidity_sensor_internal}
                                             className="temp-middle" label="Humidity"  state={props.state}/>
                        <RenderPressureMeter settings={props.settings}
                                             station_settings={props.station_settings}
                                             display_settings={props.display_settings}
                                             automation_settings={props.station.automation_settings}
                                             exists={props.settings.pressure_sensors}
                                             className="temp-bottom" label="Odor Control (pressure)"  state={props.state}/>
                        <RenderPhMeter settings={props.settings}
                                       station_settings={props.station_settings}
                                       display_settings={props.display_settings}
                                       automation_settings={props.station.automation_settings}
                                       exists={props.settings.root_ph_sensor} className="temp-middle" label="Root pH"  state={props.state}/>
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus
                            station_settings={props.station_settings}
                            automation_settings={props.station.automation_settings}
                            display_settings={props.display_settings}
                            settings={props.settings} state={props.state}
                            various_dates={props.various_dates}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderStatusTab;
