import React, { useState} from "react";
import {Table, TableCell, TableRow} from "grommet";
import RenderDeviceSwitch from "./DeviceSwitchFunctional";
import Switch from "react-input-switch";
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";

function RenderExternalMetrics (props) {

    let ret =
        <>
            <div id={"sun-moon-icon-holder"} />
        <div id="airtempexternal-text-holder">
            <RenderThermometer exists={props.state.cabinet_settings.thermometer_external}
                               currentTemperature={props.state.status.temp_air_external}
                               units={props.settings.display_settings.temperature_units}
                               direction={props.state.status.temp_air_external_direction}/>
        </div>
            <div id="humidityexternal-text-holder">
            <RenderHygrometer prefix={"external"} exists="true"
                              currentHumidity={props.state.status.humidity_external}
                              units={props.settings.display_settings.humidity_units}
                              direction={props.state.status.humidity_external_direction}/>
        </div>
            </>
    return (ret)
}

export default RenderExternalMetrics;
