import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css';
import ReactImageZoom from 'react-image-zoom';

import {Text, Button, Box, Grommet, Grid} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import util from "../../util";
import log from "roarr";

function RenderCameraTab(props) {
//    console.log("RenderCameraTab "+JSON.stringify(props.station.attached_devices))
    let userid = "90000009"

    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    let Areas = []
    let Rows = []
    let ImageProps = []
    let indexes = []
    let rowcount = 0
//    console.log("props.station.attached_devices = " + JSON.stringify(props.station.attached_devices))
    for( let i = 0; i < props.station.attached_devices.length; i++ ) {
        let picture_url = 'http://' + servers.api_server_host + ':' + servers.api_server_port +
            '/' + userid + '_' + props.station.attached_devices[i].deviceid + '.jpg?' + props.lastpicture

        log.trace("picture_url = "+picture_url)
        ImageProps.push( {width: 800,  zoomWidth: 1600, img: picture_url});

        Areas.push({ name: 'label'+i, start: [0, rowcount], end: [0, rowcount] })
        Rows.push('40px')
        rowcount++;
        Areas.push({ name: 'picture'+i, start: [0, rowcount], end: [0, rowcount] })
        Rows.push('800px')
        rowcount++;
        indexes.push(i)
    }


    function getDeviceRow(i) {
        let labelAreaIndex = i*2

        log.trace("getRow " + i +' labelAreaIndex '+labelAreaIndex + ' label '+props.station.attached_devices[i]);
        return( <><Text gridArea={"label"+i}>{props.station.attached_devices[i].deviceid}</Text><Box gridArea={Areas[labelAreaIndex+1].name}><ReactImageZoom {...ImageProps[i]} /></Box></>);
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
