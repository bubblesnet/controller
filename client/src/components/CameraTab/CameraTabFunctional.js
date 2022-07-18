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

import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css';
import ReactImageZoom from 'react-image-zoom';

import {Text, Button, Box, Grommet, Grid} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import util from "../../util";
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderCameraTab(props) {
//    console.log("RenderCameraTab "+JSON.stringify(props.station.attached_devices))
    let userid = "90000009"

    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    let Areas = []
    let Rows = []
    let ImageProps = []
    let indexes = []
    let rowcount = 0
    console.log("props.station.attached_devices = " + JSON.stringify(props.station.attached_devices))
    for( let i = 0; i < props.station.attached_devices.length; i++ ) {
        if( props.station.attached_devices[i].picamera === false ) {
            continue
        }
        let picture_url = 'http://' + servers.api_server_host + ':' + servers.api_server_port +
            '/' + userid + '_' + props.station.attached_devices[i].deviceid + '.jpg?' + props.lastpicture

        log.info("picture_url = "+picture_url)
        ImageProps.push( {width: 800,  zoomWidth: 1600, img: picture_url});

        Areas.push({ name: 'label'+i, start: [0, rowcount], end: [0, rowcount] })
        Rows.push('40px')
        rowcount++;
        Areas.push({ name: 'picture'+i, start: [0, rowcount], end: [0, rowcount] })
        Rows.push('800px')
        rowcount++;
        indexes.push({device_index: i, labelarea_index: rowcount-2, imageprops_index: rowcount-2 })
    }


    function getDeviceRow(indexObject) {

        log.info("getDeviceRow " + JSON.stringify(indexObject) + ' label '+props.station.attached_devices[indexObject.device_index] + ' areas ' + JSON.stringify(Areas));
        return( <><Text gridArea={"label"+indexObject.labelarea_index}>{props.station.attached_devices[indexObject.device_index].deviceid}</Text><Box gridArea={Areas[indexObject.labelarea_index].name}><ReactImageZoom {...ImageProps[indexObject.imageprops_index]} /></Box></>);
    }

//    console.log(JSON.stringify(Areas))
     let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: props.theme.global.font.family
                    },
                ]}
            />

            <div className="global_container_">
                <Button color={'var(--color-button-border)'} width={'medium'} round={'large'} active={true} label={'Take Picture'} onClick={props.takeAPicture} />
                <Grid
                    margin={"medium"}
                    justify={'center'}
                    round={'xxsmall'}
                    direction={'horizontal'}
                    fill
                    areas={Areas}
                    columns={['800px']}
                    rows={Rows}
                    gap={"small"}
                >
                    {indexes.map(getDeviceRow)}
                </Grid>

            </div>
        </Grommet>
    return (ret)
}

export default RenderCameraTab;
