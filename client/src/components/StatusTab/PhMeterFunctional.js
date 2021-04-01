import React, {useState} from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";
import sprintf from 'sprintf-js';

function RenderPhMeter (props) {

    let [state, setState] = useState(props.state); //

    let valueText = sprintf.sprintf( "%.1f", state.status.root_ph )
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
                <ReactSpeedometer
                    width={250} height={150}
                    value={state.status.root_ph} minValue={4} maxValue={8}
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
    if( state.station_settings.root_ph_sensor === false ) {
        ret = <></>
    }

    return (ret)
}

export default RenderPhMeter;
