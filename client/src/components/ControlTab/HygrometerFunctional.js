import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

function RenderHygrometer (props) {
//    console.log("RenderHygrometer humidity = " + props.currentHumidity)
    let holderid = props.prefix + "humidity-holder"
    let textid = props.prefix + "humiditytext-holder"
    let iconid = "externalhumidityicon-holder"
    let value = sprintf.sprintf("%2.1f", props.currentHumidity)
    let className = ""
    if (props.direction === "up") {
        className = sprintf.sprintf("externalarrowup-icon", props.prefix)
    }
    if (props.direction === "down") {
        className = sprintf.sprintf("externalarrowdown-icon", props.prefix)
    }

//    console.log("humidity rendering as " + value)
    let ret = <>
        <div id={holderid}>
         <div id={textid}>
             {value}
         </div>
         <div id={iconid}/>
        <div className={className}/>
        </div>
    </>

    if (props.exists === false) (
        ret = <></>
    )

    return (ret);
}

export default RenderHygrometer;



