import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

// copyright and license inspection - no issues 4/13/22

function RenderBarometer (props) {
    let directionClassName=""
    if(props.direction==="up") {
        directionClassName="barometerarrowup-icon"
    }
    if(props.direction==="down") {
        directionClassName="barometerarrowdown-icon"
    }
    let value = sprintf.sprintf("%.1f", props.value)
//    console.log("value rendering as " + value)
    let ret = <>
        <div className={"value-holder"} >
            {value} {props.units}
        </div>
        <div className={props.iconClassName} />
        <div className={directionClassName} />
    </>

    if(props.exists === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderBarometer;



