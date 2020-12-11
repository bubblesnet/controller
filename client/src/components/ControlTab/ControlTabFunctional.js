import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'

import RenderIntakeFan from "./IntakeFanFunctional";
import RenderExhaustFan from "./ExhaustFanFunctional";
import RenderAirPump from "./AirPumpFunctional";
import RenderGrowLight from "./GrowLightFunctional";
import RenderWaterPump from "./WaterPumpFunctional";
import RenderHeater from "./HeaterFunctional";
import RenderHumidifier from "./HumidifierFunctional";
import RenderSwitchPanel from "./SwitchPanelFunctional";
import RenderThermometer from "./ThermometerFunctional";
import {Grommet, Table} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import {grommet} from "grommet/themes";

function RenderControlTab (props) {
    const [loading,setLoading] = useState(props.loading);
    const [values, setValues] = useState( {switchControl: {
            automaticControl: {on: props.switch_state.automaticControl.on, toggle: toggleAutomatic},
            humidifier: {on: props.switch_state.humidifier.on, toggle: toggleHumidifier},
            heater: { on: props.switch_state.heater.on,  toggle: toggleHeater},
            airPump: { on: props.switch_state.airPump.on, toggle: toggleAirPump},
            waterPump: { on: props.switch_state.waterPump.on, toggle: toggleWaterPump},
            intakeFan: { on: props.switch_state.intakeFan.on,  toggle: toggleIntakeFan},
            exhaustFan: { on: props.switch_state.exhaustFan.on, toggle: toggleExhaustFan},
            growLight: { on: props.switch_state.growLight.on,  toggle: toggleGrowLight}
        }}); //
    const [themex, setThemex] = useState(props.theme); //
    const [state, setState] = useState({
        switch_state: {...(props.state.switch_state)},
        display_settings: {...(props.state.display_settings)},
        status: {...(props.state.status)}
    }); //

    function toggleAutomatic(e) {
        console.log("toggleAutomatic")
        values.switchControl.automaticControl.on = !values.switchControl.automaticControl.on;
        state.switch_state.automaticControl.on = !state.switch_state.automaticControl.on;
        props.setStateFromChild(state)
        setValues( values )
    }
    function toggleHumidifier(e) {
        console.log("toggleHumidifier")
        values.switchControl.humidifier.on = !values.switchControl.humidifier.on;
        state.switch_state.humidifier.on = !state.switch_state.humidifier.on;
        props.setStateFromChild(state)
        setLoading(!loading)
        setValues( values );
    }
    function toggleHeater(e) {
         values.switchControl.heater.on = !values.switchControl.heater.on;
        state.switch_state.heater.on = !state.switch_state.heater.on;
        props.setStateFromChild(state)
         setValues( values );
    }
    function toggleIntakeFan(e) {
        values.switchControl.intakeFan.on = !values.switchControl.intakeFan.on;
        state.switch_state.intakeFan.on = !state.switch_state.intakeFan.on;
        props.setStateFromChild(state)
        setValues( values );
    }
    function toggleExhaustFan(e) {
        values.switchControl.exhaustFan.on = !values.switchControl.exhaustFan.on;
        state.switch_state.exhaustFan.on = !state.switch_state.exhaustFan.on;
        props.setStateFromChild(state)
        setValues( values );
    }
    function toggleGrowLight(e) {
        values.switchControl.growLight.on = !values.switchControl.growLight.on;
        state.switch_state.growLight.on = !state.switch_state.growLight.on;
        props.setStateFromChild(state)
        setValues( values );
    }
    function toggleAirPump(e) {
        values.switchControl.airPump.on = !values.switchControl.airPump.on;
        state.switch_state.airPump.on = !state.switch_state.airPump.on;
        props.setStateFromChild(state)
        setValues( values );
    }
    function toggleWaterPump(e) {
        values.switchControl.waterPump.on = !values.switchControl.waterPump.on;
        state.switch_state.waterPump.on = !state.switch_state.waterPump.on;
        props.setStateFromChild(state)
        setValues( values );
    }

    useEffect(() => {}, [loading]);
    console.log("AuthenticatedApp is rendering controltab with loading "+ loading+"/"+props.loading)
//    console.log("theme = " + JSON.stringify(props.theme))
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
                    <div id="growboxgroup">
                        <div id="tub">
                            <div id="tubedge-holder">
                            </div>
                            <div id="water-level-holder">
                                <div id="water-level-text-holder">
                                    {state.status.tub_water_level} {state.display_settings.tub_volume_units}
                                </div>
                                <div id="watertemp-holder" >
                                    <RenderThermometer loading={loading} className="airtemptop-text-holder" currentTemperature={state.status.temp_water} units={state.display_settings.temperature_units} direction={state.status.temp_water_direction}/>
                                </div>
                            </div>
                        </div>
                        <div id="cabinet">
                        </div>
                        <div className="plant">
                                <div className="plant-holder">
                                    <p className="plant-2">Plant</p>
                                </div>

                            <div className="col-2">
                                <div className="pot-holder-top">
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="pot-holder-body">
                                </div>
                            </div>
                        </div>
                        <RenderGrowLight on={state.switch_state.growLight.on} state={state} />
                        <RenderHeater loading={loading} on={state.switch_state.heater.on} />
                        <RenderHumidifier on={state.switch_state.humidifier.on}/>
                        <div className="exhaust">
                            <div className="filter-and-exhaust-fan-holder">
                                <RenderExhaustFan on={state.switch_state.exhaustFan.on} />
                           </div>
                        </div>
                        <div className="fans" >
                            <div className="input-fan-holder">
                                <RenderIntakeFan on={state.switch_state.intakeFan.on} />
                            </div>
                        </div>
                        <RenderWaterPump on={state.switch_state.waterPump.on}/>
                        <RenderAirPump on={state.switch_state.airPump.on}/>
                        <div id="water-level-ruler-holder" />

                    </div>
                    <div id="controltab-buttongroup" >
                        <RenderSwitchPanel state={state} switchControl={values.switchControl}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderControlTab;
