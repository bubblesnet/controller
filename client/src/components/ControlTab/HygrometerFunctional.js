import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

function RenderHygrometer (props) {
    console.log("RenderHygrometer humidity = " + props.currentHumidity)
    let textid = props.prefix+"humiditytext-holder"
    let iconid = props.prefix+"humidityicon-holder"
    let value = sprintf.sprintf("%2.1f", props.currentHumidity)
    console.log("humidity rendering as " + value)
    let ret = <>
        <div id={textid} >
            {value}
        </div>
        <div id={iconid} />
        </>

    if(props.exists === false) (
        ret = <></>
    )

    return (ret);
}

export default RenderHygrometer;



