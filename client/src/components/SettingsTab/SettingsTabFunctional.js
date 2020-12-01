import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Checkbox,RadioButtonGroup} from 'rendition'
import {TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
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
            <>
                <div className="global_container_">
                    <Table id="settings-tab" >
                        <tbody>
                        <TableRow>
                            <TableCell border="all">
                                <Table id="localization-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2" >Localization</td></tr></thead>
                                    <tbody>
                                    <TableRow>
                                        <TableCell>Measurement Units</TableCell>
                                        <TableCell><RadioButtonGroup options={["IMPERIAL","METRIC"]} value={values.units}/></TableCell></TableRow>
                                    <TableRow>
                                        <TableCell>Language</TableCell><Select options={values.languageOptions} value={values.language}/>
                                    </TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                            <TableCell colSpan="2" border="all">
                                <Table id="enclosure-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Enclosure Characteristics</td></tr></thead>
                                    <tbody>
                                        <TableRow>
                                            <TableCell>Enclosure type</TableCell>
                                            <TableCell>
                                                <RadioButtonGroup options={values.enclosureOptions} value={values.enclosureType} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow><TableCell>Tub depth</TableCell><TableCell><TextInput value={values.tubDepth} />{values.heightUnits}</TableCell></TableRow>
                                        <TableRow><TableCell>Tub volume</TableCell><TableCell><TextInput value={values.tubVolume} />{values.liquidVolumeUnits}</TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell border="all">
                                    <Table  id="humidity-table">
                                        <thead><tr><td className="centered-thead-text" colSpan="2">Humidity</td></tr></thead>
                                        <tbody>
                                        <TableRow><TableCell><Checkbox label="Humidifier" checked={values.humidifierAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Humidity Sensor" checked={values.humiditySensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="External Humidity Sensor" checked={values.externalHumiditySensorAvailable}/></TableCell></TableRow>
                                        </tbody>
                                    </Table>
                                </TableCell>
                                <TableCell border="all">
                                    <Table  id="temperature-table">
                                        <thead><tr><td className="centered-thead-text" colSpan="2">Temperature</td></tr></thead>
                                        <tbody>
                                        <TableRow><TableCell><Checkbox label="Heater" checked={values.heaterAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Top Temp Sensor" checked={values.topTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Middle Temp Sensor" checked={values.middleTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Bottom Temp Sensor" checked={values.bottomTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="External Temp Sensor" checked={values.externalTempSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Water Temp Sensor" checked={values.waterTempSensorAvailable}/></TableCell></TableRow>
                                        </tbody>
                                    </Table>
                                </TableCell>
                            <TableCell border="all">
                                <Table  id="nutrition-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Nutrition</td></tr></thead>
                                    <tbody>
                                    <TableRow><TableCell><Checkbox label="Grow Light" checked={values.growLightAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><Checkbox label="Water Pump" checked={values.waterPumpAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><Checkbox label="Air Pump" checked={values.airPumpAvailable}/></TableCell></TableRow>
                                    <TableRow><TableCell><Checkbox label="Light Sensor" checked={values.lightSensorAvailable}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="3" border="all">
                                <Table  id="security-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Security and Odor Control</td></tr></thead>
                                    <tbody>
                                        <TableRow><TableCell><Checkbox label="Cabinet Door Sensor" checked={values.cabinetDoorSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Outer Door Sensor" checked={values.outerDoorSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Movement Sensor" checked={values.movementSensorAvailable}/></TableCell></TableRow>
                                        <TableRow><TableCell><Checkbox label="Pressure Sensors" checked={values.pressureSensorsAvailable}/></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        <TableRow height={'50px'}>
                            <TableCell justify={'center'} colSpan={'3'}>
                                <RenderFormActions />
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>

            </>
    return (ret)
}

export default RenderSettingsTab;
