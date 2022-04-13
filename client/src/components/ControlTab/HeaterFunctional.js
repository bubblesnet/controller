import React from "react";

// copyright and license inspection - no issues 4/13/22

function RenderHeater (props) {
//    console.log("RenderHeater "+props.on)
    let ret
    if( props.on === false ) {
        ret = <div id="heater-holder-off" />
    } else {
        ret = <div id="heater-holder-on" />
    }
    if(props.exists === false) (
        ret = <></>
    )
    return (ret)
}

export default RenderHeater;
