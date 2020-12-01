import React, {useEffect, useState} from 'react';
import '../../App.css';

import ReactSpeedometer from "react-d3-speedometer";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function RenderHumidityMeter (props) {

    let [value, setValue] = useState(70 ); //

    useEffect(() => {
        let rand = 70 + getRandomInt(20)
        console.log("RenderHumidityMeter useEffect value = " + value)
        const timer = setTimeout(() => setValue(rand ), 2050);
        return () => clearTimeout(timer);
    }, [value]);

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
