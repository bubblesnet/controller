import React, {useEffect, useState} from 'react';
import '../App.css';
import { Table} from "rendition";
import Loader from "./Loader";
import ReactSpeedometer from "react-d3-speedometer";

function RenderPhMeter (props) {
    let value = 6.1
    let valueText = value +""
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={value} minValue={4} maxValue={8}
                    currentValueText={valueText}
                    segments={3}
                    segmentColors={['red','green','yellow']}
                    customSegmentStops={[4, 5.8, 6.2, 8]}
                    customSegmentLabels={[
                        {text: 'ACID', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: 'BASE', position: 'INSIDE', color: 'black'},
                    ]}
                    className={props.className}
                    />
            </div>
    return (ret)
}

export default RenderPhMeter;
