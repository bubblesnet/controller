import React, {useEffect, useState} from 'react';
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

async function getContainerNames() {
    console.log("getContainerNames calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://localhost:3003/api/config/containers');
        if(response.ok) {
            let x = await response.json();
            console.log("Got container_names " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}

async function getModuleTypes() {
    console.log("getModuleTypes calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://localhost:3003/api/config/modules');
        if(response.ok) {
            let x = await response.json();
            console.log("Got module_types " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}

function RenderDeviceMapTab (props) {

    let [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state,setDefaultsButtonState] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)
    let [container_names,setContainerNames] = useState()
    let [module_types,setModuleTypes] = useState()
    const [nodeEnv, setNodeEnv] = useState("DEV");


    useEffect(() => {
        const fetchData = async () => {
            let x = await getContainerNames()
            console.log("containers " + JSON.stringify(x))
            setContainerNames(x.container_names)
            x = await getModuleTypes()
            console.log("modules " + JSON.stringify(x))
            setModuleTypes(x.module_types)
        }
        fetchData();
    }, [nodeEnv])

    function testDatabase(e) {

    }

    console.log("RenderServerSettingsTab")
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //


    let cntainer_names = ["sense-go","sense-python"]
    let mdule_types = ["bme280","bmp280","bh1750","ads1115","adxl345","ezoph","hcsr04","GPIO"]
    let devices = [70000007,70000008]

    function getRow(attached_device) {
        console.log("getRow " + JSON.stringify(attached_device))
        return(<TableRow>
            <TableCell>{getDeviceSelector(attached_device)}</TableCell>
            <TableCell>{getContainerSelector(attached_device)}</TableCell>
            <TableCell>{getTypeSelector(attached_device)}</TableCell>
            <TableCell>{getAddress(attached_device)}</TableCell>
            <TableCell>{attached_device.included_sensors.map(getIncludedSensor)}</TableCell>
        </TableRow>)
    }

    function getDeviceSelector(attached_device) {
        return <Select options={devices} value={attached_device.deviceid} />
    }

    function getContainerSelector(attached_device) {
        if (!container_names) {
            return <Select options={[]}/>
        } else {
            return <Select options={container_names} value={attached_device.container_name}/>
        }
    }

    function getTypeSelector(attached_device) {
        if (!module_types) {
            return <Select options={[]}/>
        } else {
            return <Select options={module_types} value={attached_device.device_type}/>
        }
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
                        <tbody>
                        <TableRow><th>Device ID</th><th>Container</th><th>Type</th><th>i2c Address</th><th>Attached sensors</th></TableRow>
                        {DeviceMap.attached_devices.map(getRow)}
                        </tbody>
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
