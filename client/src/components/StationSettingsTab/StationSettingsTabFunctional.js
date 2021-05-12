import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell} from 'grommet'
import './cabinetSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

function RenderStationSettingsTab (props) {
    console.log("RenderStationSettingsTab props hum = "+props.state.station_settings.humidifier)
    let [local_state, setState] = useState({ station_settings: JSON.parse(JSON.stringify(props.state.station_settings))});
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state,setDefaultsButtonState] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)


    function applyChanges() {
        setApplyButtonState(false);
        setResetButtonState(false);
        props.setStateFromChild(local_state)
    }

    function resetChanges() {
        setApplyButtonState(false);
        setResetButtonState(false);
        let x = JSON.parse(JSON.stringify(props.state.station_settings))
        setState({station_settings: x});
    }

    function changeState(s) {
        setState({station_settings: JSON.parse(JSON.stringify(s.station_settings))});
        setApplyButtonState(true);
        setResetButtonState(true);
    }

    function setEnclosureType(s) {
        console.log("setEnclosureType to "+JSON.stringify(s))
        local_state.station_settings.enclosure_type = s
        changeState(local_state)
    }

    function setTubDepth(s) {
        console.log("setTubDepth to "+JSON.stringify(s))
        if( s === '' ) {
            local_state.station_settings.tub_depth = ''
        } else {
            local_state.station_settings.tub_depth = Number(s)
        }
        changeState(local_state)
    }

    function setTubVolume(s) {
        console.log("setTubVolume to "+JSON.stringify(s))
        if( s === '' ) {
            local_state.station_settings.tub_volume = ''
        } else {
            local_state.station_settings.tub_volume = Number(s)
        }
        changeState(local_state)
    }


    function toggleHumidifier() {
        local_state.station_settings.humidifier = !local_state.station_settings.humidifier
//        props.saveSetting(local_state.userid, local_state.deviceid, 'humidifier', local_state.station_settings.humidifier)
        changeState(local_state)
    }
    function toggleRootPhSensor() {
        local_state.station_settings.root_ph_sensor = !local_state.station_settings.root_ph_sensor
        changeState(local_state)
    }
    function toggleExhaustFan() {
        local_state.station_settings.exhaust_fan = !local_state.station_settings.exhaust_fan
        changeState(local_state)
    }
    function toggleIntakeFan() {
        local_state.station_settings.intake_fan = !local_state.station_settings.intake_fan
        changeState(local_state)
    }
    function toggleWaterLevelSensor() {
        local_state.station_settings.water_level_sensor = !local_state.station_settings.water_level_sensor
        changeState(local_state)
    }

    function toggleHumiditySensorInternal() {
        local_state.station_settings.humidity_sensor_internal = !local_state.station_settings.humidity_sensor_internal
        changeState(local_state)
    }
    function toggleExternalHumiditySensor() {
        local_state.station_settings.humidity_sensor_external = !local_state.station_settings.humidity_sensor_external
        changeState(local_state)
    }
    function toggleExternalThermometer() {
        local_state.station_settings.thermometer_external = !local_state.station_settings.thermometer_external
        changeState(local_state)
    }
    function toggleThermometerTop() {
        local_state.station_settings.thermometer_top = !local_state.station_settings.thermometer_top
        changeState(local_state)
    }
    function toggleThermometerMiddle() {
        local_state.station_settings.thermometer_middle = !local_state.station_settings.thermometer_middle
        changeState(local_state)
    }
    function toggleThermometerBottom() {
        local_state.station_settings.thermometer_bottom = !local_state.station_settings.thermometer_bottom
        changeState(local_state)
    }
    function toggleWaterThermometer() {
        local_state.station_settings.thermometer_water = !local_state.station_settings.thermometer_water
        changeState(local_state)
    }
    function toggleHeater() {
        local_state.station_settings.heater = !local_state.station_settings.heater
        changeState(local_state)
    }
    function toggleWaterPump() {
        local_state.station_settings.water_pump = !local_state.station_settings.water_pump
        changeState(local_state)
    }
    function toggleAirPump() {
        local_state.station_settings.air_pump = !local_state.station_settings.air_pump
        changeState(local_state)
    }
    function toggleLightSensorInternal() {
        local_state.station_settings.light_sensor_internal = !local_state.station_settings.light_sensor_internal
        changeState(local_state)
    }
    function toggleLightSensorExternal() {
        local_state.station_settings.light_sensor_external = !local_state.station_settings.light_sensor_external
        changeState(local_state)
    }
    function toggleMovementSensor() {
        local_state.station_settings.movement_sensor = !local_state.station_settings.movement_sensor
        changeState(local_state)
    }
    function toggleOuterDoorSensor() {
        local_state.station_settings.outer_door_sensor = !local_state.station_settings.outer_door_sensor
        changeState(local_state)
    }
    function toggleStationDoorSensor() {
        local_state.station_settings.station_door_sensor = !local_state.station_settings.station_door_sensor
        changeState(local_state)
    }
    function togglePressureSensors() {
        local_state.station_settings.pressure_sensors = !local_state.station_settings.pressure_sensors
        changeState(local_state)
    }
    function toggleGerminateLight() {
        local_state.station_settings.light_germinate = !local_state.station_settings.light_germinate
        changeState(local_state)
    }
    function toggleVegetativeLight() {
        local_state.station_settings.light_vegetative = !local_state.station_settings.light_vegetative
        changeState(local_state)
    }
    function toggleBloomLight() {
        local_state.station_settings.light_bloom = !local_state.station_settings.light_bloom
        changeState(local_state)
    }

    console.log("RenderStationSettingsTab station_settings rendering with props.state.humidifier set to "+ props.state.station_settings.humidifier)
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
                                    <TableRow><TableCell><CheckBox label="Germinate (<20W)" onChange={toggleGerminateLight} checked={local_state.station_settings.light_germinate}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Vegetative"  onChange={toggleVegetativeLight} checked={local_state.station_settings.light_vegetative}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bloom" onChange={toggleBloomLight} checked={local_state.station_settings.light_bloom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Internal Light Sensor" onChange={toggleLightSensorInternal} checked={local_state.station_settings.light_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Light Sensor" onChange={toggleLightSensorExternal} checked={local_state.station_settings.light_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="humidity-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Humidifier" onChange={toggleHumidifier} checked={local_state.station_settings.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor" onChange={toggleHumiditySensorInternal} checked= {local_state.station_settings.humidity_sensor_internal}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" onChange={toggleExternalHumiditySensor} checked= {local_state.station_settings.humidity_sensor_external}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" onChange={toggleHeater} checked= {local_state.station_settings.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor" onChange={toggleThermometerTop} checked= {local_state.station_settings.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor" onChange={toggleThermometerMiddle} checked= {local_state.station_settings.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor" onChange={toggleThermometerBottom} checked= {local_state.station_settings.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor" onChange={toggleExternalThermometer} checked= {local_state.station_settings.thermometer_external}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor" onChange={toggleWaterThermometer} checked= {local_state.station_settings.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'}>
                                <Table id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Water Pump" onChange={toggleWaterPump} checked= {local_state.station_settings.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" onChange={toggleAirPump} checked= {local_state.station_settings.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Level Sensor" onChange={toggleWaterLevelSensor} checked= {local_state.station_settings.water_level_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Root pH Sensor" onChange={toggleRootPhSensor} checked= {local_state.station_settings.root_ph_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell border={'bottom'} >
                                <Table id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Airflow and Odor</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors" onChange={togglePressureSensors} checked= {local_state.station_settings.pressure_sensors}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Intake Fan" onChange={toggleIntakeFan} checked= {local_state.station_settings.intake_fan}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Exhaust Fan" onChange={toggleExhaustFan} checked= {local_state.station_settings.exhaust_fan}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  >
                                <thead><tr><td className="centered-thead-text" colSpan="2">Security</td></tr></thead>
                                <tbody>
                                <TableRow><TableCell><CheckBox label="Station Door Sensor" onChange={toggleStationDoorSensor} checked= {local_state.station_settings.station_door_sensor}/></TableCell></TableRow>
                                <TableRow><TableCell><CheckBox label="Outer Door Sensor" onChange={toggleOuterDoorSensor} checked= {local_state.station_settings.outer_door_sensor}/></TableCell></TableRow>
                                <TableRow><TableCell><CheckBox label="Movement Sensor" onChange={toggleMovementSensor} checked= {local_state.station_settings.movement_sensor}/></TableCell></TableRow>
                                </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <tr><td className="centered-thead-text" colSpan="4">Enclosure Characteristics</td></tr>
                        <TableRow>
                        <TableCell className={"table-cell"}>Enclosure type</TableCell>
                            <TableCell colSpan={3}>
                                <RadioButtonGroup name="enclosure-type" options= {props.state.station_settings.enclosure_options} value= {props.state.station_settings.enclosure_type} onChange={event => setEnclosureType(event.target.value)}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub depth</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value= {props.state.station_settings.tub_depth} onChange={event => setTubDepth(event.target.value)}/>
                            </TableCell>
                            <TableCell>{props.settings.display_settings.tub_depth_units}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub volume</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value= {props.state.station_settings.tub_volume} onChange={event => setTubVolume(event.target.value)} />
                            </TableCell>
                            <TableCell >{props.settings.display_settings.tub_volume_units}</TableCell>
                        </TableRow>
                       </tbody>
                    </Table>
            <RenderFormActions state= {local_state} applyAction={applyChanges} resetAction={resetChanges}
                               resetButtonState={reset_button_state}
                               defaultsButtonState={defaults_button_state}
                               applyButtonState={apply_button_state}
            />
        </div>
        </Grommet>
    return (ret)
}

export default RenderStationSettingsTab;
