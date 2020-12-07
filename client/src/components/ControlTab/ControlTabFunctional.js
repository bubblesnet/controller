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

function RenderControlTab (props) {

    let [values, setValues] = useState( {switchControl: {
            automaticControl: {on: true, toggle: toggleAutomatic},
            humidifier: {on: false, toggle: toggleHumidifier},
            heater: { on: false, toggle: toggleHeater},
            airPump: { on: false, toggle: toggleAirPump},
            waterPump: { on:  false, toggle: toggleWaterPump},
            intakeFan: { on:  false, toggle: toggleIntakeFan},
            exhaustFan: { on:  false, toggle: toggleExhaustFan},
            growLight: { on:  false, toggle: toggleGrowLight}
        }}); //
    let [themex, setThemex] = useState(props.theme ); //

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
    console.log("rendering with font "+ props.theme.global.font.family)

        let ret =
            <Grommet theme={themex}>
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
                                    15.70 gallons
                                </div>
                                <div id="watertemp-holder" >
                                    <RenderThermometer className="airtemptop-text-holder" currentTemperature="80F" />
                                </div>
                            </div>
                        </div>
                        <div id="cabinet">
                        </div>
                        <div className="plant">
                            <div className="col">
                                <div className="plant-holder">
                                    <p className="plant-2">Plant</p>
                                </div>
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
                        <RenderGrowLight on={values.switchControl.growLight.on} />
                        <RenderHeater on={values.switchControl.heater.on} />
                        <RenderHumidifier on={values.switchControl.humidifier.on}/>
                        <div className="exhaust">
                            <div className="filter-and-exhaust-fan-holder">
                                <RenderExhaustFan on={values.switchControl.exhaustFan.on} />
                           </div>
                        </div>
                        <div className="fans" >
                            <div className="input-fan-holder">
                                <RenderIntakeFan on={values.switchControl.intakeFan.on} />
                            </div>
                        </div>
                        <RenderWaterPump on={values.switchControl.waterPump.on}/>
                        <RenderAirPump on={values.switchControl.airPump.on}/>
                        <div id="water-level-ruler-holder" />

                    </div>
                    <div id="controltab-buttongroup" >
                        <RenderSwitchPanel switchControl={values.switchControl}/>
                    </div>
                </div>
            </Grommet>
    return (ret)
}

export default RenderControlTab;
