import React from "react";

// copyright and license inspection - no issues 4/13/2

function RenderHumidifier (props) {
    let ret
    if( props.on === false ) {
        ret = <div id="humidifier-holder-off" />
    } else {
        ret = <div id="humidifier-holder-on" />
    }
    if(props.exists === false) (
        ret = <></>
    )

    return (ret)
}

export default RenderHumidifier;
