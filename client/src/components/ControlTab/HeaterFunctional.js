import React, {useEffect, useState} from "react";



function RenderHeater (props) {
    console.log("RenderHeater")
    let ret
    if( props.on === false ) {
        ret = <div id="heater-holder-off" />
    } else {
        ret = <div id="heater-holder-on" />
    }
    return (ret)
}

export default RenderHeater;
