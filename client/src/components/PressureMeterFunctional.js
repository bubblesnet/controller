import React from 'react';
import '../App.css';
import ReactSpeedometer from "react-d3-speedometer";

function RenderPressureMeter (props) {
    let value = 5
    let valueText = value +""
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
            <ReactSpeedometer
                    width={250} height={150}
                    value={value} minValue={-50} maxValue={50}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['red','green']}
                    customSegmentStops={[-50, 0, 50]}
                    customSegmentLabels={[
                        {text: 'NOT FILTERED', position: 'INSIDE', color: 'white'},
                        {text: 'FILTERED', position: 'INSIDE', color: 'white'},
                    ]}
                    className={props.className}
                    />
            </div>
    return (ret)
}

export default RenderPressureMeter;
