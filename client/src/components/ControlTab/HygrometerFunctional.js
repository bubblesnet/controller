import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderHygrometer (props) {
    console.log("RenderHygrometer humidity = " + props.currentHumidity)
    let ret = <>
        <div id="humiditytext-holder" >
            {props.currentHumidity}
        </div>
        <div id="humidityicon-holder" />
        </>

    return (ret);
}

export default RenderHygrometer;



