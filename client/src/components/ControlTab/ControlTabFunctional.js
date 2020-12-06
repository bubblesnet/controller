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

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
/*        const timer = setTimeout(() =>
                setValues({ automaticControl: true, switchControl: {
                        heater{ on: !values.heater.on, toggle:
                        humidifier: { on: !values.humidifierOn,
                        airPumpOn: !values.airPumpOn,
                        waterPumpOn: !values.waterPumpOn,
                        intakeFanOn: !values.intakeFanOn,
                        exhaustFanOn: !values.exhaustFanOn,
                        growLightOn: !values.growLightOn
                    }})
            , 10000);
         return () => clearTimeout(timer);

 */
    }, [values]);


        let ret =
            <Grommet theme={themex}>
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
