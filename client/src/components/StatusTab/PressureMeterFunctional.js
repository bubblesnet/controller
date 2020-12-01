import React, {useEffect, useState} from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function RenderPressureMeter (props) {
    let [value, setValue] = useState(-10 ); //

    useEffect(() => {
        let rand = -10 + getRandomInt(20)
        console.log("RenderPressureMeter useEffect value = " + value)
        const timer = setTimeout(() => setValue(rand ), 1300);
        return () => clearTimeout(timer);
    }, [value]);

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
                        {text: 'ODOR ESCAPE', position: 'INSIDE', color: 'white'},
                        {text: 'NO ODOR', position: 'INSIDE', color: 'white'},
                    ]}
                    className={props.className}
                    />
            </div>
    return (ret)
}

export default RenderPressureMeter;
