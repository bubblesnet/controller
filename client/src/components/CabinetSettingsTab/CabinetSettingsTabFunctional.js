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
    let [values, setValues] = useState(props.state);
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
                                    <TableRow><TableCell><CheckBox label="Humidifier" checked={values.cabinet_settings.humidifier}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Humidity Sensor" checked={values.cabinet_settings.humidity_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Humidity Sensor" checked={values.cabinet_settings.external_humidity_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="temperature-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Heater" checked={values.cabinet_settings.heater}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Top Sensor" checked={values.cabinet_settings.thermometer_top}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Middle Sensor" checked={values.cabinet_settings.thermometer_middle}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Bottom Sensor" checked={values.cabinet_settings.thermometer_bottom}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="External Sensor" checked={values.cabinet_settings.external_thermometer}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Temp Sensor" checked={values.cabinet_settings.thermometer_water}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border={'bottom'}>
                                <Table  id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Grow Light" checked={values.cabinet_settings.grow_light}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Pump" checked={values.cabinet_settings.water_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" checked={values.cabinet_settings.air_pump}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Light Sensor" checked={values.cabinet_settings.light_sensor}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell border={'bottom'} >
                                <Table  id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security and Odor Control</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Cabinet Door Sensor" checked={values.cabinet_settings.cabinet_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Outer Door Sensor" checked={values.cabinet_settings.outer_door_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Movement Sensor" checked={values.cabinet_settings.movement_sensor}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Pressure Sensors" checked={values.cabinet_settings.pressure_sensors}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <tr><td className="centered-thead-text" colSpan="4">Enclosure Characteristics</td></tr>
                        <TableRow>
                        <TableCell className={"table-cell"}>Enclosure type</TableCell>
                            <TableCell colSpan={3}>
                                <RadioButtonGroup name="enclosure-type" options={values.cabinet_settings.enclosure_options} value={values.cabinet_settings.enclosure_type} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub depth</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={values.cabinet_settings.tub_depth} />
                            </TableCell>
                            <TableCell>{values.display_settings.tub_depth_units}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tub volume</TableCell>
                            <TableCell colSpan={2}>
                                <TextInput value={values.cabinet_settings.tub_volume} />
                            </TableCell>
                            <TableCell >{values.display_settings.tub_volume_units}</TableCell>
                        </TableRow>
                         </tbody>
                    </Table>
            <RenderFormActions />
        </div>
        </Grommet>
    return (ret)
}

export default RenderCabinetSettingsTab;
