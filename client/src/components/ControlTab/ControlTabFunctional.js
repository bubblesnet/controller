import React from 'react';
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
import {Grommet} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import RenderPhmeter from "./PhmeterFunctional";

function RenderControlTab(props) {
    let values = {
        switchControl: {
            automaticControl: {on: props.switch_state.automaticControl.on, toggle: toggleAutomatic},
            humidifier: {on: props.switch_state.humidifier.on, toggle: toggleHumidifier},
            heater: {on: props.switch_state.heater.on, toggle: toggleHeater},
            heatLamp: {on: props.switch_state.heatLamp.on, toggle: toggleHeatLamp},
            heatingPad: {on: props.switch_state.heatingPad.on, toggle: toggleHeatingPad},
            lightBloom: {on: props.switch_state.lightBloom.on, toggle: toggleLightBloom},
            lightVegetative: {on: props.switch_state.lightVegetative.on, toggle: toggleLightVegetative},
            airPump: {on: props.switch_state.airPump.on, toggle: toggleAirPump},
            waterPump: {on: props.switch_state.waterPump.on, toggle: toggleWaterPump},
            intakeFan: {on: props.switch_state.intakeFan.on, toggle: toggleIntakeFan},
            exhaustFan: {on: props.switch_state.exhaustFan.on, toggle: toggleExhaustFan},
            currentGrowLight: {on: props.switch_state.currentGrowLight.on, toggle: toggleCurrentGrowLight}
        }
    }

    function toggleAutomatic() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.automaticControl.on = !values.switchControl.automaticControl.on;
        props.setStateFromChild(x)
    }

    function toggleLightBloom() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.lightBloom.on = !values.switchControl.lightBloom.on;
        props.setStateFromChild(x,"lightBloom",x.switch_state.lightBloom.on)
    }
    function toggleLightVegetative() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.lightVegetative.on = !values.switchControl.lightVegetative.on;
        props.setStateFromChild(x,"lightVegetative",x.switch_state.lightVegetative.on)
    }
    function toggleHumidifier() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.humidifier.on = !values.switchControl.humidifier.on;
        props.setStateFromChild(x,"humidifier",x.switch_state.humidifier.on)
    }

    function toggleHeatLamp() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.heatLamp.on = !values.switchControl.heatLamp.on;
        props.setStateFromChild(x,"heatLamp",x.switch_state.heatLamp.on)
    }

    function toggleHeatingPad() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.heatingPad.on = !values.switchControl.heatingPad.on;
        props.setStateFromChild(x,"heatingPad",x.switch_state.heatingPad.on)
    }

    function toggleHeater() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.heater.on = !values.switchControl.heater.on;
        props.setStateFromChild(x,"heater",x.switch_state.heater.on)
    }

    function toggleIntakeFan() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.intakeFan.on = !values.switchControl.intakeFan.on;
        props.setStateFromChild(x,"intakeFan",x.switch_state.intakeFan.on)
    }

    function toggleExhaustFan() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.exhaustFan.on = !values.switchControl.exhaustFan.on;
        props.setStateFromChild(x,"exhaustFan",x.switch_state.exhaustFan.on)
    }

    function toggleCurrentGrowLight() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.currentGrowLight.on = !values.switchControl.currentGrowLight.on;
        props.setStateFromChild(x,"growLight",x.switch_state.currentGrowLight.on)
    }

    function toggleAirPump() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.airPump.on = !values.switchControl.airPump.on;
        props.setStateFromChild(x,"airPump",x.switch_state.airPump.on)
    }

    function toggleWaterPump() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.waterPump.on = !values.switchControl.waterPump.on;
        props.setStateFromChild(x,"waterPump",x.switch_state.waterPump.on)
    }

    let wl
    let wlRuler
    if (props.state.cabinet_settings.water_level_sensor === false) {
        wl = <></>
        wlRuler = <></>
    } else {
        wlRuler = <div id="watertemp-holder">
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
                        <div id="water-level-holder"> {wl} {wlRuler}
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
