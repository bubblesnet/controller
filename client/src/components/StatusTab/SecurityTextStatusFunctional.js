import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import sprintf from "sprintf-js";

function RenderSecurityTextStatus (props) {

    let outerdoor = <></>
    if(props.station_settings.outer_door_sensor) {
        outerdoor = <><Box gridArea={'outer-door-label'}>Outer Door</Box><Box gridArea={'outer-door-value'}>{props.sensor_readings.outer_door_open?'OPEN':'CLOSED'}</Box></>
    }
    let stationdoor = <></>
    if(props.station_settings.station_door_sensor) {
        stationdoor = <><Box gridArea={'station-door-label'}>Station Door</Box><Box gridArea={'station-door-value'}>{props.sensor_readings.station_door_open?'OPEN':'CLOSED'}</Box></>
    }
    let intpressure = <></>
    let extpressure = <></>
    let pressurediff = <></>
    let valuestr = ""
    if(props.station_settings.pressure_sensors) {
         valuestr = sprintf.sprintf( "%.1f %s", props.sensor_readings.pressure_external, props.display_settings.pressure_units )
        extpressure = <><Box gridArea={'external-pressure-label'}>External Pressure</Box><Box gridArea={'external-pressure-value'}>{valuestr}</Box></>
         valuestr = sprintf.sprintf( "%.1f %s", props.sensor_readings.pressure_internal, props.display_settings.pressure_units )
        intpressure = <><Box gridArea={'internal-pressure-label'}>Internal Pressure</Box><Box gridArea={'internal-pressure-value'}>{valuestr}</Box></>
         valuestr = sprintf.sprintf( "%.1f %s", props.sensor_readings.pressure_external-props.sensor_readings.pressure_internal, props.display_settings.pressure_units )
        pressurediff = <><Box gridArea={'pressure-differential-label'}>Pressure Diff (odor)</Box><Box gridArea={'pressure-differential-value'}>{valuestr}</Box></>
    }

    let ret =
        <Grid className={"status-table-holder"} round={'small'} direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [2, 0] },
                  { name: 'outer-door-label', start: [0, 1], end: [0, 1] },{ name: 'outer-door-value', start: [1, 1], end: [1, 1] },
                  { name: 'station-door-label', start: [0, 2], end: [0, 2] },{ name: 'station-door-value', start: [1, 2], end: [1, 2] },
                  { name: 'external-pressure-label', start: [0, 3], end: [0, 3] },{ name: 'external-pressure-value', start: [1, 3], end: [1, 3] },
                  { name: 'internal-pressure-label', start: [0, 4], end: [0, 4] },{ name: 'internal-pressure-value', start: [1, 4], end: [1, 4] },
                  { name: 'pressure-differential-label', start: [0, 5], end: [0, 5] },{ name: 'pressure-differential-value', start: [1, 5], end: [1, 5] },{ name: 'pressure-differential-direction', start: [2, 5], end: [2, 5] }
              ]}
              columns={['medium','small','xxsmall']}
              rows={['40px','20px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>Security</Box>
            {outerdoor}
            {stationdoor}
            {extpressure}
            {intpressure}
            {pressurediff}
        </Grid>
    return (ret)
}

export default RenderSecurityTextStatus;



