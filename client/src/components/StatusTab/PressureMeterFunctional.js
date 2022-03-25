import React from 'react';
import '../../App.css';
import ReactSpeedometer from "react-d3-speedometer";
import sprintf from 'sprintf-js';

function RenderPressureMeter (props) {
//    let [state, setState] = useState(props.state); //
//    let [settings, setSettings] = useState(props.settings); //

    let diff_float = (props.state.sensor_readings.pressure_external - props.state.sensor_readings.pressure_internal)
    let diff_value =  sprintf.sprintf("%.1f", diff_float)
    let valueText =  diff_value+" "+props.display_settings.pressure_units
    let ret =
        <div className={props.className}>
            <p className="meter-text">{props.label}</p>
            <ReactSpeedometer
                width={250} height={150}
                value={diff_float} minValue={-50} maxValue={50}
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
    if( props.station_settings.pressure_sensors === false ) {
        ret = <></>
    }

    return (ret)
}

export default RenderPressureMeter;
