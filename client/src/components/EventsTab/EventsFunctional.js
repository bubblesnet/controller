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
import {getLastNEvents, getSite} from "../../api/utils";
import log from "roarr";
import {Grommet, Table, TableCell, TableRow} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import RenderFormActions from "../FormActions";
import moment from "moment";

// copyright and license inspection - no issues 4/13/22

function RenderOverview (props) {
    const [station] = useState(JSON.parse(JSON.stringify(props.station)));
    const [events,setEvents] = useState([])
    const [reset_button_state] = useState(false)
    const [defaults_button_state] = useState(true)
    const [apply_button_state] = useState(false)
    const [nodeEnv] = useState(props.nodeEnv);
    const [apiHost] = useState(props.apiHost)
    const [apiPort] = useState(props.apiPort)
/*
    useEffect(() => {
        const fetchData = async () => {
            let z = await getSite(servers.api_server_host, servers.api_server_port, 1)
            setSite(JSON.parse(JSON.stringify(z)))
        }
        fetchData();
    },[]);    // eslint-disable-line react-hooks/exhaustive-deps
    */
    useEffect(() => {
        log.info("useEffect getLastN")
        const fetchData = async () => {
            log.trace("fetchData")
//            let x = await getSite(apiHost, apiPort, 1)

            let x = await getLastNEvents(apiHost, apiPort, station.stationid, 100)
            log.trace("events " + JSON.stringify(x))
            setEvents(x)
        }
        fetchData();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    log.trace("RenderEventsTab")
    let [displaySettings] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //

    function getEventrow( row ) {
//        console.log("eventrow = " + JSON.stringify(row))
        let name = row.value_name
        let value = row.stringvalue
        if( row.type !== 'measurement') {
            let x = JSON.parse(row.rawjson)
            log.trace("eventrow rawjson " + JSON.stringify(x))
            name = x.switch_name
            value = (x.on === true) ? "on":"off"
        }
        // <TableCell>{moment(row.datetimemilllis).format("LTS")}</TableCell>
        return <TableRow  key={row.eventid}>
            <TableCell>{moment(row.datetimemillis).format("LTS")}</TableCell>
            <TableCell>{row.deviceid_device}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>{row.units}</TableCell>
        </TableRow>
    }

    function getEvents() {
//        console.log("getEvents " + JSON.stringify(station))
/*        let arr = []
        for (let device_index = 0; device_index < station.attached_devices.length; device_index++) {
            for (let module_index = 0; module_index < station.attached_devices[device_index].modules.length; module_index++) {
                arr.push({deviceid: station.attached_devices[device_index], module: station.attached_devices[device_index].modules[module_index],
                    sensors: getSensorsForModule(station.attached_devices[device_index].modules[module_index]), device: station.attached_devices[device_index]})
            }
        }
        log.trace("arr = " + JSON.stringify(arr))

 */
        let ret = events.map(getEventrow)
        return ret
    }

    function applyChanges() {

    }
    function resetChanges() {

    }
    function defaultsAction() {

    }

    let event_rows = getEvents()
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
                        <th >Time</th>
                        <th >Device ID</th>
                        <th >Type</th>
                        <th >Value name</th>
                        <th >Value</th>
                        <th >Units</th>
                    </TableRow>
                    {event_rows}
                    </tbody></Table>

                <RenderFormActions station={station} applyAction={applyChanges} resetAction={resetChanges}
                                   defaultsAction={defaultsAction}
                                   resetButtonState={reset_button_state}
                                   defaultsButtonState={defaults_button_state}
                                   applyButtonState={apply_button_state}
                />
            </div>
        </Grommet>
    return( ret )
}

export default RenderOverview;
