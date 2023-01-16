/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useEffect, useState} from 'react';
import '../../App.css';
import './deviceMapTab.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
    Grommet,
    Table,
    TableRow,
    TableCell
} from 'grommet'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";
import moment from "moment";

import {getContainerNames, getModuleTypes} from '../../api/utils';
import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function RenderDeviceMapTab (props) {
    const [station] = useState(JSON.parse(JSON.stringify(props.station)));
    const [reset_button_state] = useState(false)
    const [defaults_button_state] = useState(true)
    const [apply_button_state] = useState(false)
    const [container_names,setContainerNames] = useState()
    const [module_types,setModuleTypes] = useState()
    const [nodeEnv] = useState(props.nodeEnv);
    const [apiHost] = useState(props.apiHost)
    const [apiPort] = useState(props.apiPort)

    useEffect(() => {
        const fetchData = async () => {
            let x = await getContainerNames(apiHost, apiPort)
            log.trace("containers " + JSON.stringify(container_names))
            setContainerNames(x.container_names)
            x = await getModuleTypes(apiHost, apiPort)
            log.trace("modules " + JSON.stringify(module_types))
            setModuleTypes(x.module_types)
        }
        fetchData();
    }, [nodeEnv])  // eslint-disable-line react-hooks/exhaustive-deps

    log.trace("RenderDeviceMapTab")
    let [displaySettings] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //

    function getAddress( module ) {
        if (module.protocol === "i2c") {
            return "i2c " + module.address + " "
        } else {
            return module.protocol
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
        return <TableRow  key={row.module.moduleid}>
            <TableCell>{row.device.deviceid}</TableCell>
            <TableCell>{row.module.container_name}</TableCell>
            <TableCell>{row.module.module_type}</TableCell>
            <TableCell>{getAddress(row.module)}</TableCell>
            <TableCell>{row.sensors}</TableCell></TableRow>
    }
    function getModules() {
//        console.log("getModules " + JSON.stringify(station))
        let arr = []
        for (let device_index = 0; device_index < station.attached_devices.length; device_index++) {
            for (let module_index = 0; module_index < station.attached_devices[device_index].modules.length; module_index++) {
               arr.push({deviceid: station.attached_devices[device_index], module: station.attached_devices[device_index].modules[module_index],
                    sensors: getSensorsForModule(station.attached_devices[device_index].modules[module_index]), device: station.attached_devices[device_index]})
            }
        }
        log.trace("arr = " + JSON.stringify(arr))
        let ret = arr.map(getModulerow)
        return ret
    }

    function getDevices() {
//        console.log("getModules " + JSON.stringify(station))
//        log.trace("arr = " + JSON.stringify(arr))
        let ret = station.attached_devices.map(getDeviceRow)
        return ret
    }

    function getDeviceRow( row, index, arr ) {
        console.log("row.lastseen_millis = "+row.lastseen_millis)
        let displayed_lastseen = moment(row.lastseen_millis).format("DD MMM YYYY hh:mm a")
        if( displayed_lastseen === 'Invalid date') {
            displayed_lastseen = 'never'
        }
        return <TableRow key={row.deviceid}>
            <TableCell >{row.deviceid}</TableCell>
            <TableCell >{displayed_lastseen}</TableCell>
            </TableRow>
    }

//    function getTypeSelector(module) {
//            return <Text >{module.module_type} {module.module_name}</Text>
//     }

//    function testDatabase(e) {
//
//    }

    function applyChanges() {

    }
    function resetChanges() {

    }
    function defaultsAction() {

    }

    let module_rows = getModules()
    let devices = getDevices()
//    console.log("rendering with font set to " + values.theme.global.font.family)
//    console.log("station = " + JSON.stringify(station))
    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: displaySettings.theme.global.font.family
                    },
                ]}
            />
            <div className="global_container_">
                <Table id="devicemap-lastseen-table" caption={"Edge devices and when they last messaged us."}>
                    <tbody>
                    <TableRow>
                        <th >Device</th>
                        <th >Last seen</th>
                    </TableRow>
                    {devices}
                    </tbody></Table>
                <hr />
                <Table id="devicemap-modules-table" caption={"The sensor modules and which device they're attached to."}>
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
