import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css';
import ReactImageZoom from 'react-image-zoom';

import {Text, Button, Image, Grommet, Grid} from "grommet";
import GoogleFontLoader from "react-google-font-loader";
import util from "../../util";

function RenderCameraTab(props) {

    let servers = util.get_server_ports_for_environment(props.nodeEnv)
    let picture_url1 = 'http://'+servers.api_server_host+':'+servers.api_server_port+'/00999999_70000007.jpg'
    let picture_url2 = 'http://'+servers.api_server_host+':'+servers.api_server_port+'/00999999_70000008.jpg'
    const props1 = {width: 800, height: 800, zoomWidth: 1600, img: picture_url1};
    const props2 = {width: 800, height: 800, zoomWidth: 1600, img: picture_url2};
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
                    areas={[
                        { name: 'label1', start: [0, 0], end: [0, 0] },
                        { name: 'picture1', start: [0, 1], end: [0, 1] },
                        { name: 'label2', start: [0, 2], end: [0, 2] },
                        { name: 'picture2', start: [1, 3], end: [0, 3] },
                    ]}
                    columns={['800px']}
                    rows={['40px','800px','40px','800px']}
                    gap={"small"}
                >
                    <Text gridArea={"label1"}>70000007</Text>
                    <div gridArea={"picture1"}>
                    <ReactImageZoom {...props1} />
                    </div>
                    <Text gridArea={"label2"}>70000008</Text>
                    <div gridArea={"picture2"} >
                    <ReactImageZoom {...props2} />
                    </div>
                </Grid>

            </div>
        </Grommet>
    return (ret)
}

export default RenderCameraTab;
