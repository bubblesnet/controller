import React, {useEffect, useState} from 'react';
import '../App.css';
import { Table} from "rendition";
import Loader from "./Loader";
import ReactSpeedometer from "react-d3-speedometer";

function RenderTemperatureMeter (props) {
    let value = 77
    let valueText = value +"F"
    let ret =
            <div className={props.className}>
                <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={value} minValue={32} maxValue={100}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[32, 75, 85, 100]}
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
