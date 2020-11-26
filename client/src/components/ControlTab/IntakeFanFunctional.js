import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderIntakeFan (props) {
    console.log("RenderIntakeFan intakeFanOn = " + props.on)

    let ret
        if( props.on === false ) {
            ret =
                <div>
                    <div id="intake-fan-container" />
                </div>
        } else {
            ret = <div>
                <div id="intake-animated-wind-container" />
                <div id="intake-animated-fan-container" />
            </div>
        }
    return (ret)
}

export default RenderIntakeFan;



