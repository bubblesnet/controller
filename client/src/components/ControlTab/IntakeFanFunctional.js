import React from 'react';
import '../../App.css';

// copyright and license inspection - no issues 4/13/22

function RenderIntakeFan (props) {
//    console.log("RenderIntakeFan intakeFanOn = " + props.on)

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
    if(props.exists === false) (
        ret = <></>
    )

    return (ret)
}

export default RenderIntakeFan;



