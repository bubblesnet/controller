import React, {useState} from 'react';
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
import RenderExternalMetrics from "./ExternalMetricsFunctional";
import {Grommet, Table} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import RenderPhmeter from "./PhmeterFunctional";

function RenderControlTab(props) {
//    const [automaticControlOn,setAutomaticControlOn] = useState(props.switch_state.automaticControl.on);
    console.log("props.switch_state " + JSON.stringify(props.switch_state))
    const [values, setValues] = useState({
        switchControl: {
            automaticControl: {on: props.switch_state.automaticControl.on, toggle: toggleAutomatic},
            humidifier: {on: props.switch_state.humidifier.on, toggle: toggleHumidifier},
            heater: {on: props.switch_state.heater.on, toggle: toggleHeater},
            airPump: {on: props.switch_state.airPump.on, toggle: toggleAirPump},
            waterPump: {on: props.switch_state.waterPump.on, toggle: toggleWaterPump},
            intakeFan: {on: props.switch_state.intakeFan.on, toggle: toggleIntakeFan},
            exhaustFan: {on: props.switch_state.exhaustFan.on, toggle: toggleExhaustFan},
            currentGrowLight: {on: props.switch_state.currentGrowLight.on, toggle: toggleCurrentGrowLight}
        }
    }); //

    function toggleAutomatic(e) {
        console.log("toggleAutomatic should rerender Heater")
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.automaticControl.on = !x.switch_state.automaticControl.on;
        props.setStateFromChild(x)
    }

    function toggleHumidifier(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.humidifier.on = !x.switch_state.humidifier.on;
        props.setStateFromChild(x)
    }

    function toggleHeater(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.heater.on = !x.switch_state.heater.on;
        props.setStateFromChild(x)
    }

    function toggleIntakeFan(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.intakeFan.on = !x.switch_state.intakeFan.on;
        props.setStateFromChild(x)
    }

    function toggleExhaustFan(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.exhaustFan.on = !x.switch_state.exhaustFan.on;
        props.setStateFromChild(x)
    }

    function toggleCurrentGrowLight(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.currentGrowLight.on = !x.switch_state.currentGrowLight.on;
        props.setStateFromChild(x)
    }

    function toggleAirPump(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.airPump.on = !x.switch_state.airPump.on;
        props.setStateFromChild(x)
    }

    function toggleWaterPump(e) {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.waterPump.on = !x.switch_state.waterPump.on;
        props.setStateFromChild(x)
    }

    console.log("RenderControlTab humidity = " + props.state.status.humidity_internal)
    console.log("RenderControlTab heater = " + props.state.switch_state.heater.on)
//    console.log("RenderControlTab heater = " + props.state.switch_state.heater.on )
    let wt = ""

    let wl = ""
    let wlruler = ""
    if (props.state.cabinet_settings.water_level_sensor === false) {
        wl = <></>
        wlruler = <></>
    } else {
        wlruler = <div id="watertemp-holder">
            <RenderThermometer exists={props.state.cabinet_settings.thermometer_water}
                               className="airtemptop-text-holder" currentTemperature={props.state.status.temp_water}
                               units={props.settings.display_settings.temperature_units}
                               direction={props.state.status.temp_water_direction}/>
        </div>

        wl = <div id="water-level-text-holder">
            {props.state.status.tub_water_level} {props.settings.display_settings.tub_volume_units}
        </div>
    }
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
                        <div id="water-level-holder"> {wl} {wlruler}
                        </div>
                        <div id={"root_ph_holder"}>
                            <RenderPhmeter state={props.state.status} direction={props.state.status.root_ph_direction}/>
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
                    <RenderGrowLight
                        settings={props.settings}
                        exists={props.state.cabinet_settings.light_vegetative || props.state.cabinet_settings.light_bloom || props.state.cabinet_settings.light_germinate}
                        on={props.state.switch_state.currentGrowLight.on} state={props.state}/>
                    <RenderHeater settings={props.settings} exists={props.state.cabinet_settings.heater} on={props.state.switch_state.heater.on}/>
                    <RenderHumidifier settings={props.settings} exists={props.state.cabinet_settings.humidifier}
                                      on={props.state.switch_state.humidifier.on}/>
                    <div className="exhaust">
                        <div className="filter-and-exhaust-fan-holder">
                            <RenderExhaustFan exists={props.state.cabinet_settings.exhaust_fan}
                                              on={props.state.switch_state.exhaustFan.on}/>
                        </div>
                    </div>
                    <div className="fans">
                        <div className="input-fan-holder">
                            <RenderIntakeFan settings={props.settings} exists={props.state.cabinet_settings.intake_fan}
                                             on={props.state.switch_state.intakeFan.on}/>
                        </div>
                    </div>
                    <RenderWaterPump settings={props.settings} exists={props.state.cabinet_settings.water_pump}
                                     on={props.state.switch_state.waterPump.on}/>
                    <RenderAirPump settings={props.settings} exists={props.state.cabinet_settings.air_pump}
                                   on={props.state.switch_state.airPump.on}/>
                    <div id="water-level-ruler-holder"/>

                </div>
                <div id={"controltab-externalgroup"}>
                    <RenderExternalMetrics settings={props.settings} state={props.state} />
                </div>
                <div id="controltab-buttongroup">
                    <RenderSwitchPanel settings={props.settings} state={props.state} switchControl={values.switchControl}/>
                </div>
            </div>
        </Grommet>
    return (ret)
}

export default RenderControlTab;
