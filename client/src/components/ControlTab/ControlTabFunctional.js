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

    let [values, setValues] = useState( {switchControl: {
            automaticControl: {on: props.switch_state.automaticControl.on, toggle: toggleAutomatic},
            humidifier: {on: props.switch_state.humidifier.on, toggle: toggleHumidifier},
            heater: { on: props.switch_state.heater.on,  toggle: toggleHeater},
            airPump: { on: props.switch_state.airPump.on, toggle: toggleAirPump},
            waterPump: { on: props.switch_state.waterPump.on, toggle: toggleWaterPump},
            intakeFan: { on: props.switch_state.intakeFan.on,  toggle: toggleIntakeFan},
            exhaustFan: { on: props.switch_state.exhaustFan.on, toggle: toggleExhaustFan},
            growLight: { on: props.switch_state.growLight.on,  toggle: toggleGrowLight}
        }}); //
    let [themex, setThemex] = useState(props.theme ); //
    let [state, setState] = useState(props.state ); //

    function toggleAutomatic(e) {
        console.log("toggleAutomatic")
        let x = { switchControl: values.switchControl }
        x.switchControl.automaticControl.on = !x.switchControl.automaticControl.on;
        setValues( x )
    }
    function toggleHumidifier(e) {
        console.log("toggleHumidifier")
        let x = { switchControl: values.switchControl }
        x.switchControl.humidifier.on = !x.switchControl.humidifier.on;
        setValues( x );
    }
     function toggleHeater(e) {
         let x = { switchControl: values.switchControl }
         x.switchControl.heater.on = !x.switchControl.heater.on;
         setValues( x );
    }
    function toggleIntakeFan(e) {
        let x = { switchControl: values.switchControl }
        console.log("toggleIntakeFan from "+ x.switchControl.intakeFan.on + " to " + !x.switchControl.intakeFan.on)
        x.switchControl.intakeFan.on = !x.switchControl.intakeFan.on;
        setValues( x );
    }
    function toggleExhaustFan(e) {
        let x = { switchControl: values.switchControl }
        x.switchControl.exhaustFan.on = !x.switchControl.exhaustFan.on;
        setValues( x );
    }
    function toggleGrowLight(e) {
        let x = { switchControl: values.switchControl }
        x.switchControl.growLight.on = !x.switchControl.growLight.on;
        setValues( x );
    }
    function toggleAirPump(e) {
        let x = { switchControl: values.switchControl }
        x.switchControl.airPump.on = !x.switchControl.airPump.on;
        setValues( x );
    }
    function toggleWaterPump(e) {
        let x = { switchControl: values.switchControl }
        x.switchControl.waterPump.on = !x.switchControl.waterPump.on;
        setValues( x );
    }

    useEffect(() => {}, [values]);
    console.log("rendering controltab setting with exhaustfan "+ values.switchControl.exhaustFan.on)
    console.log("1 rendering controltab setting with exhaustfan "+ state.switch_state.exhaustFan.on)
    console.log("theme = " + JSON.stringify(props.theme))
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
                                    <RenderThermometer className="airtemptop-text-holder" currentTemperature={state.status.temp_water} units={state.display_settings.temperature_units} direction={state.status.temp_water_direction}/>
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
                        <RenderHeater on={state.switch_state.heater.on} />
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
