import React from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'

import {Button, Image, Grommet} from "grommet";
import GoogleFontLoader from "react-google-font-loader";

function RenderCameraTab(props) {

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
                <div>
                    <Image
                        fit='cover'
                        src='https://v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
                    />
                </div>
            </div>
        </Grommet>
    return (ret)
}

export default RenderCameraTab;
