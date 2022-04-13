import React from "react";

// copyright and license inspection - no issues 4/13/22

function RenderWaterHeater (props) {
//    console.log("RenderHeater "+props.on)
    let ret
    if( props.on === false ) {
        ret = <div id="waterheater-holder-off" />
    } else {
        ret = <div id="waterheater-holder-on" />
    }
    if(props.exists === false) (
        ret = <></>
    )
    return (ret)
}

export default RenderWaterHeater;
