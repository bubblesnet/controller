import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

/*
                        <RenderBarometer exists={props.state.station_settings.pressure_sensors}
                                         textClassName={"pressure-text-holder"}
                                         iconClassName={"pressure-icon-holder"}
                                         value={props.state.status.pressure_internal}
                                         units={props.settings.display_settings.pressure_units}
                                         direction={props.state.status.pressure_internal_direction} />

 */

function RenderBarometer (props) {
    let directionClassName=""
    if(props.direction==="up") {
        directionClassName="barometerarrowup-icon"
    }
    if(props.direction==="down") {
        directionClassName="barometerarrowdown-icon"
    }
    let value = sprintf.sprintf("%.1f", props.value)
//    console.log("value rendering as " + value)
    let ret = <>
        <div className={"value-holder"} >
            {value} {props.units}
        </div>
        <div className={props.iconClassName} />
        <div className={directionClassName} />
    </>

    if(props.exists === false ) {
        ret = <></>
    }

    return (ret);
}

export default RenderBarometer;



