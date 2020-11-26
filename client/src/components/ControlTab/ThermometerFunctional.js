import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderThermometer (props) {
    let ret = <>
        <div className="thermo-icon" />
                    {props.currentTemperature}
                </>

    return (ret);
}

export default RenderThermometer;



