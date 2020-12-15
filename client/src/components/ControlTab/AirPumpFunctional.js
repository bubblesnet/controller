import React, {useEffect, useState} from 'react';
import '../../App.css';

function RenderAirPump (props) {
    let ret
        if( props.on === false ) {
            ret =
                <div className="airpump">
                    <div className="air-pump-holder-off">
                    </div>
                    <div className="bubble-rock-holder-off">
                    </div>
                </div>
        } else {
            ret =
                <div className="airpump">
                <div className="air-pump-holder-on">
                </div>
                <div className="bubble-holder-on">
                </div>
                <div className="bubble-rock-holder-on">
                </div>
                </div>
        }
    if(props.exists === false) (
        ret = <></>
    )

    return (ret)
}

export default RenderAirPump;



