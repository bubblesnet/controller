import React, { useState} from "react";
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";
import RenderBarometer from "./BarometerFunctional";

function RenderExternalMetrics (props) {

    let ret =
        <>
            <div id={"sun-moon-icon-holder"}/>
            <div id="airtempexternal-holder">
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
            <div className="externalpressure-holder">
                <RenderBarometer exists={props.state.cabinet_settings.pressure_sensors}
                                 holderClassName={"pressure-holder"}
                                 textClassName={"pressure-text-holder"}
                    iconClassName={"pressure-icon-holder"}
                    value={props.state.status.pressure_external}
                    units={props.settings.display_settings.pressure_units}
                    direction={"up"} />
            </div>
        </>
    return (ret)
}

export default RenderExternalMetrics;
