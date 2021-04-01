import React from 'react';
import '../../App.css';
import sprintf from 'sprintf-js';

import ReactSpeedometer from "react-d3-speedometer";

function RenderHumidityMeter (props) {
    let valueText = sprintf.sprintf("%.1f%s", props.state.status.humidity_internal, props.settings.display_settings.humidity_units)
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={props.state.status.humidity_internal} maxValue={props.state.automation_settings.humidity_max}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[props.state.automation_settings.humidity_min, props.state.automation_settings.humidity_target_range_low, props.state.automation_settings.humidity_target_range_high, props.state.automation_settings.humidity_max]}
                    customSegmentLabels={[
                        {text: 'TOO DRY', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: '', position: 'INSIDE', color: 'white'},
                    ]}
                    className={props.className}
                />
        </div>

    if( props.state.station_settings.humidity_sensor_internal === false ) {
        ret = <></>
    }

return (ret)
}

export default RenderHumidityMeter;
