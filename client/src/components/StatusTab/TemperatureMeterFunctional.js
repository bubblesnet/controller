import React from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";
import sprintf from 'sprintf-js';

function RenderTemperatureMeter (props) {
    let valueText = sprintf.sprintf("%.1f%s", props.state.status.temp_air_middle, props.settings.display_settings.temperature_units)
    let ret =
            <div className={props.className}>
                <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={props.state.status.temp_air_middle} minValue={props.state.automation_settings.temperature_min} maxValue={props.state.automation_settings.temperature_max}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[props.state.automation_settings.temperature_min, 75, 85, props.state.automation_settings.temperature_max]}
                    customSegmentLabels={[
                        {text: 'TOO COLD', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: 'HOT', position: 'INSIDE', color: 'white'},
                    ]}
                    />
            </div>
    if( props.state.cabinet_settings.thermometer_middle === false ) {
        ret = <></>
    }

    return (ret)
}

export default RenderTemperatureMeter;
