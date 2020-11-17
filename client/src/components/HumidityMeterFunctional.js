import React, {useEffect, useState} from 'react';
import '../App.css';
import { Table} from "rendition";
import Loader from "./Loader";
import ReactSpeedometer from "react-d3-speedometer";

function RenderHumidityMeter (props) {
    let value = 81
    let valueText = value +"%"
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={value} maxValue={100}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[0, 75, 85, 100]}
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
