import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
//import {Checkbox,RadioButtonGroup} from 'rendition'
import {RadioButtonGroup, CheckBox, TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './settingsTab.css'
import RenderFormActions from "../FormActions";

function RenderSettingsTab (props) {

    console.log("RenderSettingsTab")
    let [values, setValues] = useState({
        language: "en-us",
        languageOptions: ["en-us","fr"],
        enclosureType: "Cabinet",
        enclosureOptions: ["Cabinet","Tent"],
        units: "IMPERIAL",
        unitsOptions: ["IMPERIAL","METRIC"],
        tubDepth: 16.5,
        tubVolume: 18,
        heightUnits: "inches",
        liquidVolumeUnits: "gallons",

        growLightAvailable: true,
        heaterAvailable: true,
        humidifierAvailable: true,
        waterPumpAvailable: true,
        airPumpAvailable: true,
        outerDoorSensorAvailable: true,
        cabinetDoorSensorAvailable: true,
        topTempSensorAvailable: true,
        middleTempSensorAvailable: true,
        bottomTempSensorAvailable: true,
        waterTempSensorAvailable: true,
        lightSensorAvailable: true,
        humiditySensorAvailable: true,
        externalHumiditySensorAvailable: true,
        externalTempSensorAvailable: true,
        movementSensorAvailable: true,
        pressureSensorsAvailable: true,

    }); //

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [values]);

    let ret =
        <div className="global_container_">
        <Table id="settings-tab" >
                        <tbody>
                        <TableRow >
                            <TableCell colSpan={"2"}>
                                <Table id="localization-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2" >Localization</td></tr></thead>
                                    <tbody>
                                    <TableRow>
                                        <TableCell className={"table-cell"}>Measurement Units</TableCell>
                                        <TableCell><RadioButtonGroup name="units" options={["IMPERIAL","METRIC"]} value={values.units}/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={"table-cell"}>Language</TableCell><Select options={values.languageOptions} value={values.language}/>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell colSpan="2">
                                <Table id="enclosure-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Enclosure Characteristics</td></tr></thead>
                                    <tbody>
                                        <TableRow>
                                            <TableCell className={"table-cell"}>Enclosure type</TableCell>
                                            <TableCell>
                                                <RadioButtonGroup name="enclosure-type" options={values.enclosureOptions} value={values.enclosureType} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow><TableCell>Tub depth</TableCell><TableCell><TextInput value={values.tubDepth} />{values.heightUnits}</TableCell></TableRow>
                                        <TableRow><TableCell>Tub volume</TableCell><TableCell><TextInput value={values.tubVolume} />{values.liquidVolumeUnits}</TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                                <TableCell  border="top">
                                    <Table  id="humidity-table">
                                        <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                        <tbody>
                                        <TableRow><TableCell><CheckBox label="Humidifier" checked={values.humidifierAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Humidity Sensor" checked={values.humiditySensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="External Humidity Sensor" checked={values.externalHumiditySensorAvailable}/></TableCell></TableRow>
                                        </tbody>
                                    </Table>
                                </TableCell>
                                <TableCell  border="top">
                                    <Table  id="temperature-table">
                                        <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                        <tbody>
                                        <TableRow><TableCell><CheckBox label="Heater" checked={values.heaterAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Top Temp Sensor" checked={values.topTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Middle Temp Sensor" checked={values.middleTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Bottom Temp Sensor" checked={values.bottomTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="External Temp Sensor" checked={values.externalTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Water Temp Sensor" checked={values.waterTempSensorAvailable}/></TableCell></TableRow>
                                        </tbody>
                                    </Table>
                                </TableCell>
                            <TableCell  border="top">
                                <Table  id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><CheckBox label="Grow Light" checked={values.growLightAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Water Pump" checked={values.waterPumpAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Air Pump" checked={values.airPumpAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><CheckBox label="Light Sensor" checked={values.lightSensorAvailable}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell  border="top" >
                                <Table  id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security and Odor Control</td></tr></thead>
                                    <tbody>
                                        <TableRow><TableCell><CheckBox label="Cabinet Door Sensor" checked={values.cabinetDoorSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Outer Door Sensor" checked={values.outerDoorSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Movement Sensor" checked={values.movementSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><CheckBox label="Pressure Sensors" checked={values.pressureSensorsAvailable}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
            <RenderFormActions />
        </div>
    return (ret)
}

export default RenderSettingsTab;
