import React, {useEffect, useState} from 'react';
import '../../App.css';
import './deviceMapTab.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
    Grommet,
    Table,
    TableRow,
    TableCell,
    Text
} from 'grommet'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

import {getContainerNames, getModuleTypes} from '../../api/utils';

function RenderDeviceMapTab (props) {
    const [station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));
    const [reset_button_state,setResetButtonState] = useState(false)
    const [defaults_button_state,setDefaultsButtonState] = useState(true)
    const [apply_button_state,setApplyButtonState] = useState(false)
    const [container_names,setContainerNames] = useState()
    const [module_types,setModuleTypes] = useState()
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

    console.log("RenderDeviceMapTab")
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //

    function getAddress( module ) {
        if( module.device_type === "GPIO" ) {
            return ""
        } else {
            return module.address + " "
        }
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
            <TableCell>{row.device.deviceid}</TableCell>
            <TableCell>{row.module.container_name}</TableCell>
            <TableCell>{row.module.module_type}</TableCell>
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
        let ret = arr.map(getModulerow)
        return ret
    }

    function getTypeSelector(module) {
            return <Text >{module.module_type} {module.module_name}</Text>
     }

    function testDatabase(e) {

    }

    function applyChanges() {

    }
    function resetChanges() {

    }
    function defaultsAction() {

    }

    let module_rows = getModules()
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
                <Table id="settings-tab" >
                    <tbody>
                    <TableRow>
                        <th >Device</th>
                        <th >Container</th>
                        <th >Module Type</th>
                        <th >Address</th>
                        <th >Attached Sensors</th>
                    </TableRow>
                    {module_rows}
                    </tbody></Table>

                <RenderFormActions station={station} applyAction={applyChanges} resetAction={resetChanges}
                                   defaultsAction={defaultsAction}
                                   resetButtonState={reset_button_state}
                                   defaultsButtonState={defaults_button_state}
                                   applyButtonState={apply_button_state}
                />
                </div>
        </Grommet>
    return (ret)
}

export default RenderDeviceMapTab;
