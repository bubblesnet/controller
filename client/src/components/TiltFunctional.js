import React from 'react';
import '../App.css';

function RenderTiltFunctional (props) {
    console.log("RenderTilt rendering as " + props.tilt)
    let ret = <>
        <div id="tilt-gif-container" />
    </>

    if(props.tilt === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderTiltFunctional;



