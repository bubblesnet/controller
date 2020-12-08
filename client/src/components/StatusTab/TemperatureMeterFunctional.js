import React, {useEffect, useState} from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";

function RenderTemperatureMeter (props) {

    let [state, setState] = useState(props.state ); //

    let valueText = state.status.temp_air_middle +""+state.display_settings.temperature_units
    let ret =
            <div className={props.className}>
                <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={state.status.temp_air_middle} minValue={state.automation_settings.temperature_min} maxValue={state.automation_settings.temperature_max}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[state.automation_settings.temperature_min, 75, 85, state.automation_settings.temperature_max]}
                    customSegmentLabels={[
                        {text: 'TOO COLD', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: 'HOT', position: 'INSIDE', color: 'white'},
                    ]}
                    />
            </div>
    return (ret)
}

export default RenderTemperatureMeter;
