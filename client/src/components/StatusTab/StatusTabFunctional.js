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
                        <RenderTemperatureMeter settings={props.settings} exists={props.state.station_settings.temp_air_middle} className="temp-top" label="Air Temperature" state={props.state}/>
                        <RenderHumidityMeter settings={props.settings} exists={props.state.station_settings.humidity_sensor_internal} className="temp-middle" label="Humidity"  state={props.state}/>
                        <RenderPressureMeter settings={props.settings} exists={props.state.station_settings.pressure_sensors} className="temp-bottom" label="Odor Control (pressure)"  state={props.state}/>
                        <RenderPhMeter settings={props.settings} exists={props.state.station_settings.root_ph_sensor} className="temp-middle" label="Root pH"  state={props.state}/>
                    </div>
                    <div className="detail-group" >
                        <RenderTextStatus settings={props.settings} state={props.state}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderStatusTab;
