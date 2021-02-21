import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'

import RenderIntakeFan from "../ControlTab/IntakeFanFunctional";
import RenderExhaustFan from "../ControlTab/ExhaustFanFunctional";
import RenderAirPump from "../ControlTab/AirPumpFunctional";
import RenderGrowLight from "../ControlTab/GrowLightFunctional";
import RenderWaterPump from "../ControlTab/WaterPumpFunctional";
import RenderHeater from "../ControlTab/HeaterFunctional";
import RenderHumidifier from "../ControlTab/HumidifierFunctional";
import RenderSwitchPanel from "../ControlTab/SwitchPanelFunctional";
import RenderThermometer from "../ControlTab/ThermometerFunctional";
import RenderExternalMetrics from "../ControlTab/ExternalMetricsFunctional";
import {Grommet} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import RenderPhmeter from "../ControlTab/PhmeterFunctional";

function RenderCameraTab(props) {

    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: props.theme.global.font.family
                    },
                ]}
            />

            <div className="global_container_">
            </div>
        </Grommet>
    return (ret)
}

export default RenderCameraTab;
