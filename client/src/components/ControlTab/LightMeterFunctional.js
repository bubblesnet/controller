import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

function RenderLightMeter (props) {
    let directionClassName=""
    if(props.direction==="up") {
        directionClassName="arrowup-icon"
    }
    if(props.direction==="down") {
        directionClassName="arrowdown-icon"
    }
    let value = sprintf.sprintf("%.1f", props.value)
//    console.log("value rendering as " + value)
    let ret = <div className={props.className} >
        <div className={directionClassName} />
        <div className={props.iconClassName} />
        <div className={"value-holder"} >
            {value} {props.units}
        </div>
        </div>

    if(props.exists === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderLightMeter;



