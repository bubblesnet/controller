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


/*
DONE
    humidifier boolean,
    humidity_sensor_internal boolean,
    humidity_sensor_external boolean,
    heater boolean,
    thermometer_top boolean,
    thermometer_middle boolean,
    thermometer_bottom boolean,
    thermometer_external boolean,
    thermometer_water boolean,
    water_pump boolean,
    air_pump boolean,
    light_sensor_internal boolean,
    station_door_sensor boolean,
    outer_door_sensor boolean,
    movement_sensor boolean,
    pressure_sensors boolean,
    root_ph_sensor boolean,
    enclosure_type character varying(80) COLLATE pg_catalog."default" DEFAULT 'CABINET'::character varying,
    water_level_sensor boolean,
    tub_depth double precision,
    tub_volume double precision,
    intake_fan boolean,
    exhaust_fan boolean,
    light_bloom boolean,
    light_vegetative boolean,
    light_germinate boolean,
    height_sensor boolean DEFAULT false,
    station_name character varying(255) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    light_sensor_external boolean DEFAULT false,
    water_heater boolean,
    ec_sensor boolean NOT NULL DEFAULT false,
    voc_sensor boolean NOT NULL DEFAULT false,
    co2_sensor boolean NOT NULL DEFAULT false,
    tamper_xmove double precision,
    tamper_ymove double precision,
    tamper_zmove double precision,

NOT DONE
    stationid integer NOT NULL DEFAULT nextval('cabinet_cabinetid_seq'::regclass),
    controller_hostname character varying(255) COLLATE pg_catalog."default",
    controller_api_port integer,
    time_between_pictures_in_seconds integer,
    time_between_sensor_polling_in_seconds integer,
    heat_lamp boolean,
    heating_pad boolean,
    automatic_control boolean DEFAULT true,
    siteid_site integer,
    location character varying(255) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    current_stage character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'idle'::character varying,
    controller_activemq_port integer NOT NULL DEFAULT 61613,
 */

import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell, Text} from 'grommet'
import './cabinetSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

// import '../../logimplementation'

// copyright and license inspection - no issues 4/13/22

function RenderStationSettingsTab (props) {
    console.log("RenderStationSettingsTab props display_settings = "+props.display_settings)
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
        console.log("setEnclosureType to "+JSON.stringify(s))
        console.log("options = " + JSON.stringify(props.enclosure_options))
        console.log("enc type = " + JSON.stringify(local_station.enclosure_type))
        let x = JSON.parse(JSON.stringify(local_station))
        x.enclosure_type = s
        changeState(x)
    }
    function setTubDepth(s) {
        console.log("setTubDepth to "+JSON.stringify(s))
        let the_int = parseInt(s,10)
        if (isNaN(the_int)) {
            alert("Tub depth must be an integer number of inches")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.tub_depth = the_int
        changeState(x)
    }
    function setTubVolume(s) {
        console.log("setTubVolume to "+JSON.stringify(s))
        let the_int = parseInt(s,10)
        if (isNaN(the_int)) {
            alert("Tub volume must be an integer number of gallons")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.tub_volume = the_int
        changeState(x)
    }
    function setStationName(s) {
        console.log("setStationName to "+JSON.stringify(s))
        let x = JSON.parse(JSON.stringify(local_station))
        x.station_name = s
        changeState(x)
    }
    function setPictureTime(s) {
        console.log("setPictureTime to "+JSON.stringify(s))
        let the_int = parseInt(s,10)
        if (isNaN(the_int)) {
            alert("Picture poll interval must be an integer number of seconds")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.time_between_pictures_in_seconds = the_int
        changeState(x)
    }
    function setSensorPollTime(s) {
        console.log("setSensorPollTime to "+JSON.stringify(s))
        let the_int = parseInt(s,10)
        if (isNaN(the_int)) {
            alert("Sensor poll interval must be an integer number of seconds")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.time_between_sensor_polling_in_seconds = the_int
        changeState(x)
    }
    function setMovementX(s) {
        console.log("setMovementX to "+JSON.stringify(s))
        let the_float = parseFloat(s)
        if (isNaN(the_float) || s.length > (''+the_float).length ) {
            alert("Movement must be a float number of inches")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.tamper_xmove = the_float
        changeState(x)
    }
    function setMovementY(s) {
        console.log("setMovementY to "+JSON.stringify(s))
        let the_float = parseFloat(s)
        if (isNaN(the_float)  || s.length > (''+the_float).length ) {
            alert("Movement must be a float number of inches")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.tamper_ymove = the_float
        changeState(x)
    }
    function setMovementZ(s) {
        console.log("setMovementZ to "+JSON.stringify(s))
        let the_float = parseFloat(s)
        if (isNaN(the_float)) {
            alert("Movement must be a float number of inches")
            return;
        }
        let x = JSON.parse(JSON.stringify(local_station))
        x.tamper_zmove = the_float
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

    function toggleWaterDispenser() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.water_dispenser = !x.water_dispenser
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
    function toggleVOCSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.voc_sensor = !x.voc_sensor
        changeState(x)
    }
    function toggleCO2Sensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.co2_sensor = !x.co2_sensor
        changeState(x)
    }
    function toggleECSensor() {
        let x = JSON.parse(JSON.stringify(local_station))
        x.ec_sensor = !x.ec_sensor
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

    console.log("RenderStationSettingsTab station_settings rendering with props.station.humidifier set to "+ props.station.humidifier)
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
                            <TableCell  border={'bottom'} >
                                <Table id="station-name-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Station</td></tr></thead>
                                    <tbody>
                                    <TableRow>
                                        <TableCell>Name <TextInput value={local_station.station_name} onChange={event => setStationName(event.target.value)} /></TableCell>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table id="enclosure-type-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Enclosure type</td></tr></thead>
                                    <tbody>

                                    <TableRow><TableCell><RadioButtonGroup name="enclosure-type"
                                                  options={props.display_settings.enclosure_options}
                                                  value={local_station.enclosure_type}
                                                  onChange={event => setEnclosureType(event.target.value)}/>
                                    </TableCell>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'} >
                                <Table id="monitoring-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Monitoring</td></tr></thead>
                                    <tbody>
                                    <TableRow>
                                        <TableCell>Time between pictures (seconds) <TextInput value={local_station.time_between_pictures_in_seconds} onChange={event => setPictureTime(event.target.value)} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Time between sensor polls (seconds) <TextInput value={local_station.time_between_sensor_polling_in_seconds} onChange={event => setSensorPollTime(event.target.value)} /></TableCell>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell  border={'bottom'}>
                                <Table id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Station Door Sensor" onChange={toggleStationDoorSensor} checked={local_station.station_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Outer Door Sensor" onChange={toggleOuterDoorSensor} checked={local_station.outer_door_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table id="tilt-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Tamper Sensing</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell>
                                        <CheckBox label="Movement Sensor (axl345)" onChange={toggleMovementSensor} checked={local_station.movement_sensor}/>
                                    </TableCell></TableRow>
                                    <TableRow>
                                        <TableCell>
                                        <Table >
                                            <tbody>
                                            <TableRow >
                                                <TableCell ><Text >Up and down sensitivity</Text></TableCell>
                                                <TableCell ><TextInput size="xsmall" value={local_station.tamper_xmove} onChange={event => setMovementX(event.target.value)} /></TableCell>
                                            </TableRow>
                                            </tbody>
                                        </Table>
                                    </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Table >
                                                <tbody>
                                                <TableRow >
                                                    <TableCell ><Text >Side to side sensitivity</Text></TableCell>
                                                    <TableCell ><TextInput size="xsmall" value={local_station.tamper_ymove} onChange={event => setMovementY(event.target.value)} /></TableCell>
                                                </TableRow>
                                                </tbody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Table >
                                                <tbody>
                                                <TableRow >
                                                    <TableCell ><Text >Back and forth sensitivity</Text></TableCell>
                                                    <TableCell ><TextInput size="xsmall" value={local_station.tamper_zmove} onChange={event => setMovementZ(event.target.value)} /></TableCell>
                                                </TableRow>
                                                </tbody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table id="odor-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Odor Control</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors (bme280)" onChange={togglePressureSensors} checked={local_station.pressure_sensors}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
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
                                    <TableRow><TableCell><CheckBox label="Internal Light Sensor (bh1750)" onChange={toggleLightSensorInternal} checked={local_station.light_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Light Sensor (bh1750)" onChange={toggleLightSensorExternal} checked={local_station.light_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="humidity-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Air</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Intake Fan" onChange={toggleIntakeFan} checked= {local_station.intake_fan}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidifier" onChange={toggleHumidifier} checked={local_station.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor (bme280)" onChange={toggleHumiditySensorInternal} checked= {local_station.humidity_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="VOC Sensor (cs811)" onChange={toggleVOCSensor} checked= {local_station.voc_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="CO2 Sensor (cs811)" onChange={toggleCO2Sensor} checked= {local_station.co2_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Exhaust Fan" onChange={toggleExhaustFan} checked= {local_station.exhaust_fan}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" onChange={toggleExternalHumiditySensor} checked= {local_station.humidity_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Heat</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" onChange={toggleHeater} checked= {local_station.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor (bme280)" onChange={toggleThermometerTop} checked= {local_station.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor (bme280)" onChange={toggleThermometerMiddle} checked= {local_station.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor (bme280)" onChange={toggleThermometerBottom} checked= {local_station.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor (bme280)" onChange={toggleExternalThermometer} checked= {local_station.thermometer_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell border={'bottom'} >
                                <Table id="tub-table">
                                <thead><tr><td className="centered-thead-text" colSpan="2">Reservoir</td></tr></thead>
                                <tbody>
                                <TableRow><TableCell>Volume <TextInput value={local_station.tub_volume} onChange={event => setTubVolume(event.target.value)} />
                                    {props.display_settings.tub_volume_units} </TableCell></TableRow>
                                <TableRow><TableCell>Depth <TextInput value={local_station.tub_depth} onChange={event => setTubDepth(event.target.value)}/>
                                    {props.display_settings.tub_depth_units} </TableCell></TableRow>
                                </tbody>
                                </Table>
                            </TableCell>

                            <TableCell border={'bottom'} >
                                <Table id="water-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Water</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Water Dispenser" onChange={toggleWaterDispenser} checked={local_station.water_dispenser}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Pump" onChange={toggleWaterPump} checked={local_station.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Level Sensor (eTape)" onChange={toggleWaterLevelSensor} checked={local_station.water_level_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Heater" onChange={toggleWaterHeater} checked={local_station.water_heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor ()" onChange={toggleWaterThermometer} checked={local_station.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'}>
                                <Table id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Root Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Bubbler Pump" onChange={toggleAirPump} checked={local_station.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Root pH Sensor (ezoPH)" onChange={toggleRootPhSensor} checked={local_station.root_ph_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="EC Sensor ()" onChange={toggleECSensor} checked={local_station.ec_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell border={'bottom'} >
                                <Table id="pressure-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Progress</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Height Sensor ()" onChange={toggleHeightSensor} checked={local_station.height_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
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
