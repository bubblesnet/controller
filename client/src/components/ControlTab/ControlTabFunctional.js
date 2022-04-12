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
import log from 'roarr';

function RenderControlTab(props) {

    let switchControl = {
            automaticControl: {toggle: toggleAutomatic},
            humidifier: {changing: false, toggle: toggleHumidifier},
            heater: {changing: false, toggle: toggleHeater},
            heatLamp: {changing: false, toggle: toggleHeatLamp},
            heatingPad: {changing: false, toggle: toggleHeatingPad},
            waterHeater: {changing: false, toggle: toggleWaterHeater},
            lightBloom: {changing: false, toggle: toggleLightBloom},
            lightVegetative: {changing: false, toggle: toggleLightVegetative},
            airPump: {changing: false, toggle: toggleAirPump},
            waterPump: {changing: false, toggle: toggleWaterPump},
            intakeFan: {changing: false, toggle: toggleIntakeFan},
            exhaustFan: {changing: false, toggle: toggleExhaustFan},
            currentGrowLight: {changing: false, toggle: toggleCurrentGrowLight}
    }


    /***
     *
    function toggleState() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.changingState.on = !values.switchControl.changingState.on;
        props.setStateFromChild(x, "changingState", x.changingState.on)
    }
     */

    function toggleAutomatic() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.automaticControl.on = !props.switch_state.automaticControl.on;
        log.trace("toggleAutomatic from " + props.switch_state.automaticControl.on + " to " + x.automaticControl.on)
        props.setStateFromChild(x, "automaticControl", x.automaticControl.on)
    }

    function toggleLightBloom() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.lightBloom.on = !props.switch_state.lightBloom.on;
        props.setStateFromChild(x,"lightBloom",x.lightBloom.on)
    }

    function toggleLightVegetative() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.lightVegetative.on = !props.switch_state.lightVegetative.on;
        props.setStateFromChild(x,"lightVegetative",x.lightVegetative.on)
    }

    function toggleHumidifier() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.humidifier.on = !props.switch_state.humidifier.on;
        props.setStateFromChild(x,"humidifier",x.humidifier.on)
    }

    function toggleHeatLamp() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.heatLamp.on = !props.switch_state.heatLamp.on;
        props.setStateFromChild(x,"heatLamp",x.heatLamp.on)
    }

    function toggleHeatingPad() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.heatingPad.on = !props.switch_state.heatingPad.on;
        props.setStateFromChild(x,"heatingPad",x.heatingPad.on)
    }

    function toggleWaterHeater() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.waterHeater.on = !props.switch_state.waterHeater.on;
        props.setStateFromChild(x,"waterHeater",x.waterHeater.on)
    }

    function toggleHeater() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.heater.on = !props.switch_state.heater.on;
        props.setStateFromChild(x,"heater",x.heater.on)
    }

    function toggleIntakeFan() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.intakeFan.on = !props.switch_state.intakeFan.on;
        props.setStateFromChild(x,"intakeFan",x.intakeFan.on)
    }

    function toggleExhaustFan() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.exhaustFan.on = !props.switch_state.exhaustFan.on;
        props.setStateFromChild(x,"exhaustFan",x.exhaustFan.on)
    }

    function toggleCurrentGrowLight() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.currentGrowLight.on = !props.switch_state.currentGrowLight.on;
        props.setStateFromChild(x,"growLight",x.currentGrowLight.on)
    }

    function toggleAirPump() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.airPump.on = !props.switch_state.airPump.on;
        props.setStateFromChild(x,"airPump",x.airPump.on)
    }

    function toggleWaterPump() {
        let x = JSON.parse(JSON.stringify(props.switch_state));
        x.waterPump.on = !props.switch_state.waterPump.on;
        props.setStateFromChild(x,"waterPump",x.waterPump.on)
    }

    let wl
    let wlRuler
    if (props.station.water_level_sensor === false) {
        wl = <></>
        wlRuler = <></>
    } else {
//        console.log("props.station = " + JSON.stringify(props.station))
        wlRuler = <div id="watertemp-holder">
            <RenderThermometer exists={props.station.thermometer_water}
                               className="airtemptop-text-holder" currentTemperature={props.sensor_readings.temp_water}
                               units={props.display_settings.temperature_units}
                               direction={props.sensor_readings.temp_water_direction}/>
        </div>

        wl = <div id="water-level-text-holder">
            {props.sensor_readings.tub_water_level} {props.display_settings.tub_volume_units}
        </div>
    }
    let water_level_percent = props.sensor_readings.tub_water_level/20.0
    let water_level_max_pixels = 188
    let water_level_height = water_level_max_pixels*water_level_percent
    let water_level_top = (water_level_max_pixels-water_level_height) + 'px'
//    console.log("rerender: "+props.because)
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
                            <RenderPhmeter exists={props.station.root_ph_sensor} sensor_readings={props.sensor_readings} />
                        </div>
                        <div className="waterheater">
                            <RenderWaterHeater exists={props.station.water_heater} on={props.switch_state.waterHeater.on} />
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
                        station={props.station}
                        sensor_readings = {props.sensor_readings}
                        display_settings={props.display_settings}
                        exists={props.station.light_vegetative || props.station.light_bloom || props.station.light_germinate}
                        on={props.switch_state.lightBloom.on || props.switch_state.lightVegetative.on}
                    />
                    <RenderHeater exists={props.station.heater} on={props.switch_state.heater.on}/>
                    <RenderHumidifier exists={props.station.humidifier} on={props.switch_state.humidifier.on}/>
                    <div className="exhaust">
                        <div className="filter-and-exhaust-fan-holder">
                            <RenderExhaustFan exists={props.station.exhaust_fan} on={props.switch_state.exhaustFan.on}/>
                        </div>
                    </div>
                    <div className="fans">
                        <div className="input-fan-holder">
                            <RenderIntakeFan exists={props.station.intake_fan} on={props.switch_state.intakeFan.on}/>
                        </div>
                    </div>

                    <RenderWaterPump exists={props.station.water_pump} on={props.switch_state.waterPump.on}/>
                    <RenderAirPump exists={props.station.air_pump} on={props.switch_state.airPump.on}/>
                    <div id="water-level-ruler-holder"/>

                </div>
                <div id={"controltab-externalgroup"}>
                    <RenderExternalMetrics display_settings={props.display_settings}
                                           station={props.station}
                                           sensor_readings={props.sensor_readings}
                                            />
                </div>
                <div id="controltab-buttongroup">
                    <RenderSwitchPanel display_settings={props.display_settings}
                                       station={props.station}
                                       switch_state={props.switch_state}
                                       switchControl={switchControl}
                                       automation_setting={props.station}
                                       setCurrentStage={props.setCurrentStage}
                    />
                </div>
            </div>
        </Grommet>
    return (ret)
}

export default RenderControlTab;
