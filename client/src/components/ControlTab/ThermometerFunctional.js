import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderThermometer (props) {
    let className=""
    if(props.direction==="up") {
        className="arrowup-icon"
    }
    if(props.direction==="down") {
        className="arrowdown-icon"
    }
    let ret = <>
        <div className="thermo-icon" />
        {props.currentTemperature} {props.units}
        <div className={className} />
    </>

    return (ret);
}

export default RenderThermometer;



