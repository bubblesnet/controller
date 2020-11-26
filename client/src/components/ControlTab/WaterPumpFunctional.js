import React, {useEffect, useState} from "react";



function RenderWaterPump (props) {
    let ret
    if( props.on === false ) {
        ret =
            <div id="waterpump-off" >
            </div>
    } else {
        ret =
            <div id="waterpump-on">
                <div id="drippingwater" />
            </div>

    }
    return (ret)
}


export default RenderWaterPump;
