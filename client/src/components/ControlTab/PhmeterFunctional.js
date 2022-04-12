import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

function RenderPhmeter (props) {
    let value = sprintf.sprintf("%2.1f", props.sensor_readings.root_ph)
    let className = ""
    if (props.sensor_readings.root_ph_direction === "up") {
        className = sprintf.sprintf("externalarrowup-icon")
    }
    if (props.sensor_readings.root_ph_direction === "down") {
        className = sprintf.sprintf("externalarrowdown-icon")
    }

  //  console.log("ph rendering as " + value)
    let ret = <>
             pH {value}
        <div className={className}/>
    </>

    if (props.exists === false) (
        ret = <></>
    )

    return (ret);
}

export default RenderPhmeter;



