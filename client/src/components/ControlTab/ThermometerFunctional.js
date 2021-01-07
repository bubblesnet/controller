import React from 'react';
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
        <div className={className} />
        <div className="thermo-icon" />
        {props.currentTemperature} {props.units}
    </>

    if(props.exists === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderThermometer;



