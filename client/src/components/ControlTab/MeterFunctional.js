import React, {useEffect, useState} from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";

function RenderMeter (props) {

    let ret =
            <div>
                <ReactSpeedometer
                    width="250" height="150"
                    value={0} maxValue={100}
                    segments={3}
                    segmentColors={['blue','green','red']}
                    customSegmentStops={[32, 75, 85, 100]}
                    customSegmentLabels={[
                        {text: 'COLD', position: 'INSIDE', color: 'white'},
                        {text: 'OK', position: 'INSIDE', color: 'white'},
                        {text: 'HOT', position: 'INSIDE', color: 'white'},
                    ]}
                    />
            </div>
    return (ret)
}

export default RenderMeter;
