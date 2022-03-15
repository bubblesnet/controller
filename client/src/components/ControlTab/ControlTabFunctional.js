import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'

import RenderWaterHeater from "./WaterHeaterFunctional";
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
            humidifier: {on: props.switch_state.humidifier.on, changing: false, toggle: toggleHumidifier},
            heater: {on: props.switch_state.heater.on, changing: false, toggle: toggleHeater},
            heatLamp: {on: props.switch_state.heatLamp.on, changing: false, toggle: toggleHeatLamp},
            heatingPad: {on: props.switch_state.heatingPad.on, changing: false, toggle: toggleHeatingPad},
            waterHeater: {on: props.switch_state.waterHeater.on, changing: false, toggle: toggleWaterHeater},
            lightBloom: {on: props.switch_state.lightBloom.on, changing: false, toggle: toggleLightBloom},
            lightVegetative: {on: props.switch_state.lightVegetative.on, changing: false, toggle: toggleLightVegetative},
            airPump: {on: props.switch_state.airPump.on, changing: false, toggle: toggleAirPump},
            waterPump: {on: props.switch_state.waterPump.on, changing: false, toggle: toggleWaterPump},
            intakeFan: {on: props.switch_state.intakeFan.on, changing: false, toggle: toggleIntakeFan},
            exhaustFan: {on: props.switch_state.exhaustFan.on, changing: false, toggle: toggleExhaustFan},
            currentGrowLight: {on: props.switch_state.currentGrowLight.on, changing: false, toggle: toggleCurrentGrowLight}
        }
    }

    /***
     *
    function toggleState() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.changingState.on = !values.switchControl.changingState.on;
        props.setStateFromChild(x, "changingState", x.switch_state.changingState.on)
    }
     */

    function toggleAutomatic() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.automaticControl.on = !values.switchControl.automaticControl.on;
        props.setStateFromChild(x, "automaticControl", x.switch_state.automaticControl.on)
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

    function toggleWaterHeater() {
        let x = JSON.parse(JSON.stringify(props.state));
        x.switch_state.waterHeater.on = !values.switchControl.waterHeater.on;
        props.setStateFromChild(x,"waterHeater",x.switch_state.waterHeater.on)
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
    if (props.station.water_level_sensor === false) {
        wl = <></>
        wlRuler = <></>
    } else {
        console.log("props.settings = " + JSON.stringify(props.settings))
        wlRuler = <div id="watertemp-holder">
            <RenderThermometer exists={props.station.thermometer_water}
                               className="airtemptop-text-holder" currentTemperature={props.state.status.temp_water}
                               units={props.settings.display_settings.temperature_units}
                               direction={props.state.status.temp_water_direction}/>
        </div>

        wl = <div id="water-level-text-holder">
            {props.state.status.tub_water_level} {props.settings.display_settings.tub_volume_units}
        </div>
    }
    let water_level_percent = props.state.status.tub_water_level/20.0
    let water_level_max_pixels = 188
    let water_level_height = water_level_max_pixels*water_level_percent
    let water_level_top = (water_level_max_pixels-water_level_height) + 'px'
    console.log("rerender: "+props.because)
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
                        <div id="water-level-holder" style={{'height': water_level_height,'top': water_level_top}}>
                        </div>
                        {wl}
                        {wlRuler}
                        <div id={"root_ph_holder"}>
                            <RenderPhmeter state={props.state.status} direction={props.state.status.root_ph_direction}/>
                        </div>
                        <div className="waterheater">
                            <RenderWaterHeater settings={props.settings} exists={props.station.water_heater}
                                               on={props.state.switch_state.waterHeater.on} changing={false}/>
                        </div>

                    </div>
                    <div id="station">
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
                        exists={props.station.light_vegetative || props.station.light_bloom || props.station.light_germinate}
                        on={props.state.switch_state.lightBloom.on || props.state.switch_state.lightVegetative.on}  station={props.station}  state={props.state}/>
                    <RenderHeater settings={props.settings} exists={props.station.heater} on={props.state.switch_state.heater.on}/>
                    <RenderHumidifier settings={props.settings} exists={props.station.humidifier}
                                      on={props.state.switch_state.humidifier.on}/>
                    <div className="exhaust">
                        <div className="filter-and-exhaust-fan-holder">
                            <RenderExhaustFan exists={props.station.exhaust_fan}
                                              on={props.state.switch_state.exhaustFan.on}/>
                        </div>
                    </div>
                    <div className="fans">
                        <div className="input-fan-holder">
                            <RenderIntakeFan settings={props.settings} exists={props.station.intake_fan}
                                             on={props.state.switch_state.intakeFan.on}/>
                        </div>
                    </div>

                    <RenderWaterPump settings={props.settings} exists={props.station.water_pump}
                                     on={props.state.switch_state.waterPump.on}/>
                    <RenderAirPump settings={props.settings} exists={props.station.air_pump}
                                   on={props.state.switch_state.airPump.on}/>
                    <div id="water-level-ruler-holder"/>

                </div>
                <div id={"controltab-externalgroup"}>
                    <RenderExternalMetrics settings={props.settings}  station={props.station} state={props.state} />
                </div>
                <div id="controltab-buttongroup">
                    <RenderSwitchPanel settings={props.settings} station={props.station} state={props.state} switchControl={values.switchControl}/>
                </div>
            </div>
        </Grommet>
    return (ret)
}

export default RenderControlTab;
