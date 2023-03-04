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
import './calibrationTab.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
    Grommet,
    Table,
    TableRow,
    TableCell, Button
} from 'grommet'
// import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";

import { getModuleTypes} from '../../api/utils';
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderCalibrationTab (props) {
    const [station] = useState(JSON.parse(JSON.stringify(props.station)));
    const [module_types,setModuleTypes] = useState()
    const [nodeEnv] = useState(props.nodeEnv);
    const [apiHost] = useState(props.apiHost)
    const [apiPort] = useState(props.apiPort)

    useEffect(() => {
        const fetchData = async () => {
            let x = await getModuleTypes(apiHost, apiPort)
            log.trace("modules " + JSON.stringify(module_types))
            setModuleTypes(x.module_types)
        }
        fetchData();
    }, [nodeEnv])  // eslint-disable-line react-hooks/exhaustive-deps

    log.trace("RenderDeviceMapTab")
    let [displaySettings] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //

    function getAddress( module ) {
        if( module.device_type === "GPIO" ) {
            return ""
        } else {
            return module.address + " "
        }
    }

//    function getSensorsForModule(module) {
//        return( module.included_sensors.map(getIncludedSensor))
//    }

    function getSensorrow( row, index, arr ) {
        log.info("getSensorrow " + JSON.stringify(row.sensor))
        return <TableRow  key={row.sensor.sensorid}>
            <TableCell>{row.device.deviceid}</TableCell>
            <TableCell>{row.module.module_type}</TableCell>
            <TableCell>{getAddress(row.module)}</TableCell>
            <TableCell>{row.sensor.sensor_name}</TableCell>
            <TableCell>{row.sensor.measurement_name}</TableCell>
            <TableCell>never</TableCell>
            <TableCell>
                <Button color={'var(--color-button-border)'} width={'medium'} round={'large'} disabled={!isCalibratable(row.sensor)} label={'Calibrate'} />
            </TableCell>
        </TableRow>
    }

    function isCalibratable(sensor) {
        if( sensor.sensor_name === 'ph_sensor' ) {
            return true
        }
        return(false)
    }

    function getModules() {
//        console.log("getModules " + JSON.stringify(station.attached_devices.length))
        let arr = []
        for (let device_index = 0; device_index < station.attached_devices.length; device_index++) {
            for (let module_index = 0; module_index < station.attached_devices[device_index].modules.length; module_index++) {
                let z = station.attached_devices[device_index].modules[module_index].included_sensors
                log.info("sensors " + JSON.stringify(z))
                for (let sensor_index = 0; sensor_index < z.length; sensor_index++) {
                    arr.push({
                        deviceid: station.attached_devices[device_index],
                        module: station.attached_devices[device_index].modules[module_index],
                        sensor: z[sensor_index],
                        device: station.attached_devices[device_index]
                    })
                }
            }
        }
        log.trace("arr = " + JSON.stringify(arr))
        let ret = arr.map(getSensorrow)
        return ret
    }

//    function getTypeSelector(module) {
//            return <Text >{module.module_type} {module.module_name}</Text>
//     }

//    function testDatabase(e) {
//
//    }

    let module_rows = getModules()
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
                <Table id="settings-tab" >
                    <tbody>
                    <TableRow>
                        <th >Device</th>
                        <th >Module Type</th>
                        <th >Address</th>
                        <th >Sensor</th>
                        <th >Measurement</th>
                        <th >Last Calibration</th>
                    </TableRow>
                    {module_rows}
                    </tbody></Table>
             </div>
        </Grommet>
    return (ret)
}

export default RenderCalibrationTab;
