import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

function RenderThermometer (props) {
    let className=""
    if(props.direction==="up") {
        className="arrowup-icon"
    }
    if(props.direction==="down") {
        className="arrowdown-icon"
    }
    let value = sprintf.sprintf("%.1f", props.currentTemperature)
//    console.log("temp rendering as " + value)
    let ret = <>
        <div className={className} />
        <div className="thermo-icon" />
        <div className={"airtempexternal-text-holder"}>{value}{props.units}</div>
    </>

    if(props.exists === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderThermometer;



