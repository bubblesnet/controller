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


async function getContainerNames(host, port) {
    console.log("getContainerNames calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/containers');
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

async function getModuleTypes(host, port) {
    console.log("getModuleTypes calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/modules');
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

    let [station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));
    let [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));
    let [reset_button_state,setResetButtonState] = useState(false)
    let [defaults_button_state,setDefaultsButtonState] = useState(true)
    let [apply_button_state,setApplyButtonState] = useState(false)
    let [container_names,setContainerNames] = useState()
    let [module_types,setModuleTypes] = useState()
    const [nodeEnv, setNodeEnv] = useState("DEV");


    useEffect(() => {
        const fetchData = async () => {
            let x = await getContainerNames(props.apiHost, props.apiPort)
            console.log("containers " + JSON.stringify(x))
            setContainerNames(x.container_names)
            x = await getModuleTypes(props.apiHost, props.apiPort)
            console.log("modules " + JSON.stringify(x))
            setModuleTypes(x.module_types)
        }
        fetchData();
    }, [nodeEnv])

    console.log("RenderServerSettingsTab")
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //


    let cntainer_names = ["sense-go","sense-python"]
    let mdule_types = ["bme280","bmp280","bh1750","ads1115","adxl345","ezoph","hcsr04","GPIO"]


    function getAddress( module ) {
        if( module.device_type === "GPIO" ) {
            return ""
        } else {
            return module.address + " "
        }
    }

    function getContainerSelector(module) {
        if (!container_names) {
            return <Select options={[]}/>
        } else {
            return <Select options={container_names} value={module.container_name}/>
        }
    }

    function getDeviceID(value,index,arr) {
        return( value.deviceid )
    }
    let devices = station.attached_devices.map(getDeviceID)

    function getDeviceSelector(attached_device) {
        return <Select options={devices} value={attached_device.deviceid} />
    }

    function getIncludedSensor( sensor, index, arr ) {
        if( sensor.device_type === "GPIO" ) {
            return sensor.sensor_name + " "
        } else {
            return sensor.sensor_name + ":" + sensor.measurement_name + " "
        }
    }

    function getSensorsForModule(module) {
        return( module.included_sensors.map(getIncludedSensor))
    }

    function getModulerow( row, index, arr ) {
        return <TableRow>
            <TableCell>{getDeviceSelector(row.device)}</TableCell>
            <TableCell>{getContainerSelector(row.module)}</TableCell>
            <TableCell>{getTypeSelector(row.module)}</TableCell>
            <TableCell>{getAddress(row.module)}</TableCell>
            <TableCell>{row.sensors}</TableCell></TableRow>
    }
    function getModules() {
        console.log("getModules " + JSON.stringify(station))
        let arr = []
        for (let device_index = 0; device_index < station.attached_devices.length; device_index++) {
            for (let module_index = 0; module_index < station.attached_devices[device_index].modules.length; module_index++) {
                let row =
               arr.push({deviceid: station.attached_devices[device_index], module: station.attached_devices[device_index].modules[module_index],
                    sensors: getSensorsForModule(station.attached_devices[device_index].modules[module_index]), device: station.attached_devices[device_index]})
            }
        }
        console.log("arr = " + JSON.stringify(arr))
        let ret = <Table id="devicemap-table" >
            <tbody>
            <TableRow><th>Device ID</th><th>Container</th><th>Type</th><th>i2c Address</th><th>Attached sensors</th></TableRow>
            {arr.map(getModulerow)}
            </tbody>
        </Table>

        return ret
    }

    function getTypeSelector(module) {
        if (typeof mdule_types === 'undefined') {
            return <Select options={[]}/>
        } else {
            return <Select options={mdule_types} value={module.module_type}/>
        }
    }

    function testDatabase(e) {

    }

    function applyChanges() {

    }
    function resetChanges() {

    }

    let modulerows = getModules()
    console.log("rendering with font set to " + values.theme.global.font.family)
    console.log("station = " + JSON.stringify(station))
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
                        {modulerows}
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
