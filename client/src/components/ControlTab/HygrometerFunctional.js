import React from 'react';
import '../../App.css';

function RenderHygrometer (props) {
    console.log("RenderHygrometer humidity = " + props.currentHumidity)
    let textid = props.prefix+"humiditytext-holder"
    let iconid = props.prefix+"humidityicon-holder"
    let ret = <>
        <div id={textid} >
            {props.currentHumidity}
        </div>
        <div id={iconid} />
        </>

    if(props.exists === false) (
        ret = <></>
    )

    return (ret);
}

export default RenderHygrometer;



