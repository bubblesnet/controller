import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderHygrometer (props) {
    let ret = <>
        <div id="humiditytext-holder" >
            {props.currentHumidity}
        </div>
        <div id="humidityicon-holder" />
        </>

    return (ret);
}

export default RenderHygrometer;



