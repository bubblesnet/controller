import React from "react";

function RenderExhaustFan (props) {
//    console.log("RenderExhaustFan " + props.on)
    let ret
    if( props.on === false ) {
        ret =
            <div>
                <div id= "exhaust-fan-filter" />
                <div id="exhaust-stopped-fan-container" />
            </div>
    } else {
        ret = <div>
            <div id= "exhaust-fan-filter" />
            <div id="exhaust-animated-fan-container" />
            <div id="exhaust-animated-wind-container" />
        </div>
    }
    if(props.exists === false) (
        ret = <></>
    )

    return (ret)
}

export default RenderExhaustFan;
