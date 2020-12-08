import React, {useEffect, useState} from 'react';
import '../../App.css';

import ReactSpeedometer from "react-d3-speedometer";

function RenderHumidityMeter (props) {

    let [state, setState] = useState(props.state); //

    let valueText = state.status.humidity_internal +""+ state.display_settings.humidity_units
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={state.status.humidity_internal} maxValue={state.automation_settings.humidity_max}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[state.automation_settings.humidity_min, state.automation_settings.humidity_target_range_low, state.automation_settings.humidity_target_range_high, state.automation_settings.humidity_max]}
                    customSegmentLabels={[
                        {text: 'TOO DRY', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: '', position: 'INSIDE', color: 'white'},
                    ]}
                    className={props.className}
                />
        </div>
    return (ret)
}

export default RenderHumidityMeter;
