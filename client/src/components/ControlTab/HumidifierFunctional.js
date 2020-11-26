import React, {useEffect, useState} from "react";



function RenderHumidifier (props) {
    let ret
    if( props.on === false ) {
        ret = <div id="humidifier-holder-off" />
    } else {
        ret = <div id="humidifier-holder-on" />
    }
    return (ret)
}

export default RenderHumidifier;
