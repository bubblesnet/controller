import React, {useState} from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";
import sprintf from 'sprintf-js';

function RenderPressureMeter (props) {
    let [state, setState] = useState(props.state); //
    let [settings, setSettings] = useState(props.settings); //

    let difffloat = (state.status.pressure_external - state.status.pressure_internal)
    let diffvalue =  sprintf.sprintf("%.1f", difffloat)
    let valueText =  diffvalue+" "+settings.display_settings.pressure_units
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
            <ReactSpeedometer
                    width={250} height={150}
                    value={difffloat} minValue={-50} maxValue={50}
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
    if( state.station_settings.pressure_sensors === false ) {
        ret = <></>
    }

    return (ret)
}

export default RenderPressureMeter;
