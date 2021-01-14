import React, {useState} from 'react';
import '../../App.css';
import './deviceMapTab.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
    Button,
    Grommet,
    TextInput,
    Table,
    TableRow,
    TableCell,
    Select
} from 'grommet'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

import DeviceMap from "./devicemap.json"

function RenderDeviceMapTab (props) {

    let [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state,setDefaultsButtonState] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)

    function testDatabase(e) {

    }

    console.log("RenderServerSettingsTab")
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //


    function getRow(attached_device) {
        return( <TableRow><TableCell>{getDeviceSelector(attached_device)}</TableCell>
            <TableCell>{getContainerSelector(attached_device)}</TableCell>
            <TableCell>{getTypeSelector(attached_device)}</TableCell>
            <TableCell>{getAddress(attached_device)}</TableCell>
            <TableCell>{attached_device.included_sensors.map(getIncludedSensor)}</TableCell>
        </TableRow>)
    }

    function getDeviceSelector(attached_device) {
        return <Select options={[70000007,70000008]} value={attached_device.deviceid} />
    }
    function getContainerSelector(attached_device) {
        return <Select options={["sense-go","sense-python"]} value={attached_device.container_name} />
    }
    function getTypeSelector(attached_device) {
        return <Select options={["bme280","bh1750","ads1115","adxl345","ezoph","hcsr04","GPIO"]} value={attached_device.device_type} />
    }

    function getAddress( attached_device ) {
        if( attached_device.device_type === "GPIO" ) {
            return ""
        } else {
            return attached_device.address + " "
        }
    }

    function getIncludedSensor( sensor ) {
        if( sensor.device_type === "GPIO" ) {
            return sensor.sensor_name + " "
        } else {
            return sensor.sensor_name + ":" + sensor.address + " "
        }
    }

    function applyChanges() {

    }
    function resetChanges() {

    }

    console.log("rendering with font set to " + values.theme.global.font.family)
    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: values.theme.global.font.family
                    },
                ]}
            />
            <div className="global_container_">
                    <Table id="devicemap-table" >
                        <TableRow><th>Device ID</th><th>Container</th><th>Type</th><th>i2c Address</th><th>Attached sensors</th></TableRow>
                        {DeviceMap.attached_devices.map(getRow)}
                    </Table>
                <RenderFormActions state={local_state} applyAction={applyChanges} resetAction={resetChanges}
                                   resetButtonState={reset_button_state}
                                   defaultsButtonState={defaults_button_state}
                                   applyButtonState={apply_button_state}
                />
                </div>
        </Grommet>
    return (ret)
}

export default RenderDeviceMapTab;
