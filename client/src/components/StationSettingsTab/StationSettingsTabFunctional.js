/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell} from 'grommet'
import './cabinetSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

import '../../logimplementation'
import log from 'roarr';

// copyright and license inspection - no issues 4/13/22

function RenderStationSettingsTab (props) {
    log.trace("RenderStationSettingsTab props display_settings = "+props.display_settings)
    let [local_station, setStation] = useState(props.station);
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)


    function applyChanges() {
        setApplyButtonState(false);
        setResetButtonState(false);
        props.setStateFromChild(local_station)
    }

    function resetChanges() {
        setApplyButtonState(false);
        setResetButtonState(false);
        let x = JSON.parse(JSON.stringify(props.station))
        setStation(x);
    }

    function changeState(s) {
        setStation(s);
        setApplyButtonState(true);
        setResetButtonState(true);
    }

    function setEnclosureType(s) {
        log.trace("setEnclosureType to "+JSON.stringify(s))
        let x = JSON.parse(JSON.stringify(props.station))
        x.enclosure_type = s
        changeState(x)
    }

    function setTubDepth(s) {
        log.trace("setTubDepth to "+JSON.stringify(s))
        let x = JSON.parse(JSON.stringify(local_station))
        if( s === '' ) {
            x.tub_depth = ''
        } else {
            x.tub_depth = Number(s)
        }
        changeState(x)
    }

    function setTubVolume(s) {
        log.trace("setTubVolume to "+JSON.stringify(s))
        let x = JSON.parse(JSON.stringify(local_station))
        if( s === '' ) {
            x.tub_volume = ''
        } else {
            x.tub_volume = Number(s)
        }
        changeState(x)
    }


    function toggleHumidifier() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.humidifier = !x.humidifier
        changeState(x)
    }
    function toggleHeightSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.height_sensor = !x.height_sensor
        changeState(x)
    }
    function toggleWaterHeater() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.water_heater = !x.water_heater
        changeState(x)
    }

    function toggleRootPhSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.root_ph_sensor = !x.root_ph_sensor
        changeState(x)
    }

    function toggleExhaustFan() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.exhaust_fan = !x.exhaust_fan
        changeState(x)
    }

    function toggleIntakeFan() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.intake_fan = !x.intake_fan
        changeState(x)
    }

    function toggleWaterLevelSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.water_level_sensor = !x.water_level_sensor
        changeState(x)
    }

    function toggleHumiditySensorInternal() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.humidity_sensor_internal = !x.humidity_sensor_internal
        changeState(x)
    }

    function toggleExternalHumiditySensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.humidity_sensor_external = !x.humidity_sensor_external
        changeState(x)
    }

    function toggleExternalThermometer() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.thermometer_external = !x.thermometer_external
        changeState(x)
    }

    function toggleThermometerTop() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.thermometer_top = !x.thermometer_top
        changeState(x)
    }

    function toggleThermometerMiddle() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.thermometer_middle = !x.thermometer_middle
        changeState(x)
    }

    function toggleThermometerBottom() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.thermometer_bottom = !x.thermometer_bottom
        changeState(x)
    }

    function toggleWaterThermometer() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.thermometer_water = !x.thermometer_water
        changeState(x)
    }

    function toggleHeater() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.heater = !x.heater
        changeState(x)
    }

    function toggleWaterPump() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.water_pump = !x.water_pump
        changeState(x)
    }

    function toggleAirPump() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.air_pump = !x.air_pump
        changeState(x)
    }

    function toggleLightSensorInternal() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.light_sensor_internal = !x.light_sensor_internal
        changeState(x)
    }

    function toggleLightSensorExternal() {
        let x = JSON.parse(JSON.stringify(local_station))
        x['light_sensor_external'] = !x['light_sensor_external']
        changeState(x)
    }

    function toggleMovementSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.movement_sensor = !x.movement_sensor
        changeState(x)
    }

    function toggleOuterDoorSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.outer_door_sensor = !x.outer_door_sensor
        changeState(x)
    }

    function toggleStationDoorSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.station_door_sensor = !x.station_door_sensor
        changeState(x)
    }

    function togglePressureSensors() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.pressure_sensors = !x.pressure_sensors
        changeState(x)
    }

    function toggleGerminateLight() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.light_germinate = !x.light_germinate
        changeState(x)
    }

    function toggleVegetativeLight() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.light_vegetative = !x.light_vegetative
        changeState(x)
    }

    function toggleBloomLight() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.light_bloom = !x.light_bloom
        changeState(x)
    }

    log.trace("RenderStationSettingsTab station_settings rendering with props.station.humidifier set to "+ props.station.humidifier)
    let ret =
        <Grommet theme={props.theme} >
            <GoogleFontLoader
                fonts={[
                    {
                        font: props.theme.global.font.family
                    },
                ]}
            />
        <div className="global_container_">
        <Table id={'settings-tab'} >
                        <tbody>
                        <TableRow >
                            <TableCell border={'bottom'} >Station name</TableCell>
                            <TableCell  border={'bottom'} colSpan={3}>
                                <TextInput value= {props.station.station_name} onChange={event => setTubVolume(event.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell border={'bottom'} >
                                <Table id="light-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Light</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Germinate (<20W)" onChange={toggleGerminateLight} checked={local_station.light_germinate}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Vegetative"  onChange={toggleVegetativeLight} checked={local_station.light_vegetative}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bloom" onChange={toggleBloomLight} checked={local_station.light_bloom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Internal Light Sensor" onChange={toggleLightSensorInternal} checked={local_station.light_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Light Sensor" onChange={toggleLightSensorExternal} checked={local_station.light_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="humidity-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Humidifier" onChange={toggleHumidifier} checked={local_station.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor" onChange={toggleHumiditySensorInternal} checked= {local_station.humidity_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" onChange={toggleExternalHumiditySensor} checked= {local_station.humidity_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" onChange={toggleHeater} checked= {local_station.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor" onChange={toggleThermometerTop} checked= {local_station.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor" onChange={toggleThermometerMiddle} checked= {local_station.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor" onChange={toggleThermometerBottom} checked= {local_station.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor" onChange={toggleExternalThermometer} checked= {local_station.thermometer_external}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Heater" onChange={toggleWaterHeater} checked= {local_station.water_heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor" onChange={toggleWaterThermometer} checked= {local_station.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'}>
                                <Table id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Water Pump" onChange={toggleWaterPump} checked= {local_station.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" onChange={toggleAirPump} checked= {local_station.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Level Sensor" onChange={toggleWaterLevelSensor} checked= {local_station.water_level_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Root pH Sensor" onChange={toggleRootPhSensor} checked= {local_station.root_ph_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Height Sensor" onChange={toggleHeightSensor} checked= {local_station.height_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell border={'bottom'} >
                                <Table id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Airflow and Odor</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors" onChange={togglePressureSensors} checked= {local_station.pressure_sensors}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Intake Fan" onChange={toggleIntakeFan} checked= {local_station.intake_fan}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Exhaust Fan" onChange={toggleExhaustFan} checked= {local_station.exhaust_fan}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  >
                                <thead><tr><td className="centered-thead-text" colSpan="2">Security</td></tr></thead>
                                <tbody>
                                <TableRow><TableCell><CheckBox label="Station Door Sensor" onChange={toggleStationDoorSensor} checked= {local_station.station_door_sensor}/></TableCell></TableRow>
                                <TableRow><TableCell><CheckBox label="Outer Door Sensor" onChange={toggleOuterDoorSensor} checked= {local_station.outer_door_sensor}/></TableCell></TableRow>
                                <TableRow><TableCell><CheckBox label="Movement Sensor" onChange={toggleMovementSensor} checked= {local_station.movement_sensor}/></TableCell></TableRow>
                                </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <tr><td className="centered-thead-text" colSpan="4">Enclosure Characteristics</td></tr>
                        <TableRow>
                        <TableCell className={"table-cell"}>Enclosure type</TableCell>
                            <TableCell colSpan={3}>
                                <RadioButtonGroup name="enclosure-type"
                                                  options={props.display_settings.enclosure_options}
                                                  value={props.station.enclosure_type}
                                                  onChange={event => setEnclosureType(event.target.value)}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub depth</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value= {props.station.tub_depth} onChange={event => setTubDepth(event.target.value)}/>
                            </TableCell>
                            <TableCell>{props.display_settings.tub_depth_units}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub volume</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value= {props.station.tub_volume} onChange={event => setTubVolume(event.target.value)} />
                            </TableCell>
                            <TableCell >{props.display_settings.tub_volume_units}</TableCell>
                        </TableRow>
                       </tbody>
                    </Table>
            <RenderFormActions state= {local_station} applyAction={applyChanges} resetAction={resetChanges}
                               resetButtonState={reset_button_state}
                               defaultsButtonState={defaults_button_state}
                               applyButtonState={apply_button_state}
            />
        </div>
        </Grommet>
    return (ret)
}

export default RenderStationSettingsTab;
