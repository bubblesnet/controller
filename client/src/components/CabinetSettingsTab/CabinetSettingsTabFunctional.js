import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './cabinetSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

function RenderCabinetSettingsTab (props) {

    console.log("RenderCabinetSettingsTab")
    let [values, setValues] = useState(props.cabinet_settings);
    let [bubbles_theme, setTheme] = useState(props.theme ); //

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [values]);

    let ret =
        <Grommet theme={bubbles_theme} >
            <GoogleFontLoader
                fonts={[
                    {
                        font: props.theme.global.font.family
                    },
                ]}
            />
        <div className="global_container_">
        <Table id="settings-tab" >
                        <tbody>
                        <TableRow >
                            <TableCell  border={'bottom'}>
                                <Table  id="humidity-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Humidifier" checked={values.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor" checked={values.humidity_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" checked={values.external_humidity_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" checked={values.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor" checked={values.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor" checked={values.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor" checked={values.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor" checked={values.external_thermometer}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor" checked={values.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Grow Light" checked={values.grow_light}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Pump" checked={values.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" checked={values.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Light Sensor" checked={values.light_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'} >
                                <Table  id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security and Odor Control</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Cabinet Door Sensor" checked={values.cabinet_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Outer Door Sensor" checked={values.outer_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Movement Sensor" checked={values.movement_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors" checked={values.pressure_sensors}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <tr><td className="centered-thead-text" colSpan="4">Enclosure Characteristics</td></tr>
                        <TableRow>
                        <TableCell className={"table-cell"}>Enclosure type</TableCell>
                            <TableCell colSpan={3}>
                                <RadioButtonGroup name="enclosure-type" options={values.enclosure_options} value={values.enclosure_type} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub depth</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={values.tub_depth} />
                            </TableCell>
                            <TableCell>{values.tub_depth_units}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub volume</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={values.tub_volume} />
                            </TableCell>
                            <TableCell >{values.tub_volume_units}</TableCell>
                        </TableRow>
                         </tbody>
                    </Table>
            <RenderFormActions />
        </div>
        </Grommet>
    return (ret)
}

export default RenderCabinetSettingsTab;
