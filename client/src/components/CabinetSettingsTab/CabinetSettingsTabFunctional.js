import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './cabinetSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";
import { normalizeColor, deepMerge } from 'grommet/utils';
import { FormCheckmark } from 'grommet-icons';
import { grommet } from 'grommet/themes';

function RenderCabinetSettingsTab (props) {
    console.log("RenderCabinetSettingsTab props hum = "+props.state.cabinet_settings.humidifier)
    let [state, setState] = useState({ cabinet_settings: JSON.parse(JSON.stringify(props.state.cabinet_settings))});
    let [display_settings, setDisplaySettings] = useState(JSON.parse(JSON.stringify(props.state.display_settings)));
    let [loading,setLoading] = useState(false)
    let [bubbles_theme, setTheme] = useState(props.theme ); //
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state,setDefaultsButtonState] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)


    function stl(value) {
        setLoading(value)
    }
    function applyChanges(e) {
        setApplyButtonState(false);
        setResetButtonState(false);
        props.setStateFromChild(state)
        stl(!loading)
    }

    function resetChanges(e) {
        console.log("RenderCabinetSettingsTab resetChanges props hum = " + props.state.cabinet_settings.humidifier);
        setApplyButtonState(false);
        setResetButtonState(false);
        let x = JSON.parse(JSON.stringify(props.state.cabinet_settings))
        setState({cabinet_settings: x});
        stl(!loading);
    }

    function changeState(s) {
        setState({cabinet_settings: JSON.parse(JSON.stringify(s.cabinet_settings))});
        setApplyButtonState(true);
        setResetButtonState(true);
        stl(!loading);
    }

    function setEnclosureType(s) {
        console.log("setEnclosureType to "+JSON.stringify(s))
        state.cabinet_settings.enclosure_type = s
        changeState(state)
    }

    function setTubDepth(s) {
        console.log("setTubDepth to "+JSON.stringify(s))
        if( s === '' ) {
            state.cabinet_settings.tub_depth = ''
        } else {
            state.cabinet_settings.tub_depth = Number(s)
        }
        changeState(state)
    }

    function setTubVolume(s) {
        console.log("setTubVolume to "+JSON.stringify(s))
        if( s === '' ) {
            state.cabinet_settings.tub_volume = ''
        } else {
            state.cabinet_settings.tub_volume = Number(s)
        }
        changeState(state)
    }

    function toggleHumidifier(e) {
        state.cabinet_settings.humidifier = !state.cabinet_settings.humidifier
        changeState(state)
    }

    function toggleHumiditySensor(e) {
        state.cabinet_settings.humidity_sensor = !state.cabinet_settings.humidity_sensor
        changeState(state)
    }
    function toggleExternalHumiditySensor(e) {
        state.cabinet_settings.external_humidity_sensor = !state.cabinet_settings.external_humidity_sensor
        changeState(state)
    }
    function toggleExternalThermometer(e) {
        state.cabinet_settings.external_thermometer = !state.cabinet_settings.external_thermometer
        changeState(state)
    }
    function toggleThermometerTop(e) {
        state.cabinet_settings.thermometer_top = !state.cabinet_settings.thermometer_top
        changeState(state)
    }
    function toggleThermometerMiddle(e) {
        state.cabinet_settings.thermometer_middle = !state.cabinet_settings.thermometer_middle
        changeState(state)
    }
    function toggleThermometerBottom(e) {
        state.cabinet_settings.thermometer_bottom = !state.cabinet_settings.thermometer_bottom
        changeState(state)
    }
    function toggleWaterThermometer(e) {
        state.cabinet_settings.thermometer_water = !state.cabinet_settings.thermometer_water
        changeState(state)
    }
    function toggleHeater(e) {
        state.cabinet_settings.heater = !state.cabinet_settings.heater
        changeState(state)
    }
    function toggleGrowLight(e) {
        state.cabinet_settings.grow_light = !state.cabinet_settings.grow_light
        changeState(state)
    }
    function toggleWaterPump(e) {
        state.cabinet_settings.water_pump = !state.cabinet_settings.water_pump
        changeState(state)
    }
    function toggleAirPump(e) {
        state.cabinet_settings.air_pump = !state.cabinet_settings.air_pump
        changeState(state)
    }
    function toggleLightSensor(e) {
        state.cabinet_settings.light_sensor = !state.cabinet_settings.light_sensor
        changeState(state)
    }
    function toggleMovementSensor(e) {
        state.cabinet_settings.movement_sensor = !state.cabinet_settings.movement_sensor
        changeState(state)
    }
    function toggleOuterDoorSensor(e) {
        state.cabinet_settings.outer_door_sensor = !state.cabinet_settings.outer_door_sensor
        changeState(state)
    }
    function toggleCabinetDoorSensor(e) {
        state.cabinet_settings.cabinet_door_sensor = !state.cabinet_settings.cabinet_door_sensor
        changeState(state)
    }
    function togglePressureSensors(e) {
        state.cabinet_settings.pressure_sensors = !state.cabinet_settings.pressure_sensors
        changeState(state)
    }

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [loading]);

    console.log("RenderCabinetSettingsTab cabinetsettings rendering with state.humidifier set to "+ state.cabinet_settings.humidifier)
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
                            <TableCell  border={'bottom'}>
                                <Table  id="humidity-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Humidifier" onChange={toggleHumidifier} checked={state.cabinet_settings.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor" onChange={toggleHumiditySensor} checked={state.cabinet_settings.humidity_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" onChange={toggleExternalHumiditySensor} checked={state.cabinet_settings.external_humidity_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" onChange={toggleHeater} checked={state.cabinet_settings.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor" onChange={toggleThermometerTop} checked={state.cabinet_settings.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor" onChange={toggleThermometerMiddle} checked={state.cabinet_settings.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor" onChange={toggleThermometerBottom} checked={state.cabinet_settings.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor" onChange={toggleExternalThermometer} checked={state.cabinet_settings.external_thermometer}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor" onChange={toggleWaterThermometer} checked={state.cabinet_settings.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'}>
                                <Table id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Grow Light" onChange={toggleGrowLight} checked={state.cabinet_settings.grow_light}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Pump" onChange={toggleWaterPump} checked={state.cabinet_settings.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" onChange={toggleAirPump} checked={state.cabinet_settings.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Light Sensor" onChange={toggleLightSensor} checked={state.cabinet_settings.light_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'} >
                                <Table id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security and Odor Control</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Cabinet Door Sensor" onChange={toggleCabinetDoorSensor} checked={state.cabinet_settings.cabinet_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Outer Door Sensor" onChange={toggleOuterDoorSensor} checked={state.cabinet_settings.outer_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Movement Sensor" onChange={toggleMovementSensor} checked={state.cabinet_settings.movement_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors" onChange={togglePressureSensors} checked={state.cabinet_settings.pressure_sensors}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <tr><td className="centered-thead-text" colSpan="4">Enclosure Characteristics</td></tr>
                        <TableRow>
                        <TableCell className={"table-cell"}>Enclosure type</TableCell>
                            <TableCell colSpan={3}>
                                <RadioButtonGroup name="enclosure-type" options={state.cabinet_settings.enclosure_options} value={state.cabinet_settings.enclosure_type} onChange={event => setEnclosureType(event.target.value)}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub depth</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={state.cabinet_settings.tub_depth} onChange={event => setTubDepth(event.target.value)}/>
                            </TableCell>
                            <TableCell>{display_settings.tub_depth_units}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub volume</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={state.cabinet_settings.tub_volume} onChange={event => setTubVolume(event.target.value)} />
                            </TableCell>
                            <TableCell >{display_settings.tub_volume_units}</TableCell>
                        </TableRow>
                         </tbody>
                    </Table>
            <RenderFormActions state={state} applyAction={applyChanges} resetAction={resetChanges}
                               resetButtonState={reset_button_state}
                               defaultsButtonState={defaults_button_state}
                               applyButtonState={apply_button_state}
            />
        </div>
        </Grommet>
    return (ret)
}

export default RenderCabinetSettingsTab;
