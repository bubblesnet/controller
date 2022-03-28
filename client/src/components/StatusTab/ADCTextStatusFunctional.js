import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import RenderADCValueWithDirection from './ADCValueWithDirection'

function RenderADCTextStatus (props) {
    let ret =
        <Grid className={'status-table-holder'}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [2, 0] },
                  { name: '0_0-label', start: [0, 1], end: [0, 1] }, { name: '0_1-value', start: [1, 1], end: [1, 1] }, { name: '0_0-direction', start: [2, 1], end: [2, 1] },
                  { name: '0_1-label', start: [0, 1], end: [0, 1] }, { name: '0_2-value', start: [1, 1], end: [1, 1] }, { name: '0_1-direction', start: [2, 1], end: [2, 1] },
                  { name: '0_2-label', start: [0, 1], end: [0, 1] }, { name: '0_3-value', start: [1, 1], end: [1, 1] }, { name: '0_2-direction', start: [2, 1], end: [2, 1] },
                  { name: '0_3-label', start: [0, 1], end: [0, 1] }, { name: '0_4-value', start: [1, 1], end: [1, 1] }, { name: '0_3-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_0-label', start: [0, 1], end: [0, 1] }, { name: '1_1-value', start: [1, 1], end: [1, 1] }, { name: '1_0-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_1-label', start: [0, 1], end: [0, 1] }, { name: '1_2-value', start: [1, 1], end: [1, 1] }, { name: '1_1-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_2-label', start: [0, 1], end: [0, 1] }, { name: '1_3-value', start: [1, 1], end: [1, 1] }, { name: '1_2-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_3-label', start: [0, 1], end: [0, 1] }, { name: '1_4-value', start: [1, 1], end: [1, 1] }, { name: '1_3-direction', start: [2, 1], end: [2, 1] },
              ]}
              columns={['medium', 'small','xxsmall']}
              rows={['40px','20px','20px','20px','20px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>ADC</Box>
            <RenderADCValueWithDirection gridArea={'0_0'} label='Bd 0 ch 0' value={props.sensor_readings.adc_0_0_1_860} units={props.sensor_readings.adc_0_0_1_860_units} direction={props.sensor_readings.adc_0_0_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'0_1'} label='Bd 0 ch 1' value={props.sensor_readings.adc_0_1_1_860} units={props.sensor_readings.adc_0_1_1_860_units} direction={props.sensor_readings.adc_0_1_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'0_2'} label='Bd 0 ch 2' value={props.sensor_readings.adc_0_2_1_860} units={props.sensor_readings.adc_0_2_1_860_units} direction={props.sensor_readings.adc_0_2_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'0_3'} label='Bd 0 ch 3' value={props.sensor_readings.adc_0_3_1_860} units={props.sensor_readings.adc_0_3_1_860_units} direction={props.sensor_readings.adc_0_3_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'1_0'} label='Bd 1 ch 0' value={props.sensor_readings.adc_1_0_1_860} units={props.sensor_readings.adc_1_0_1_860_units} direction={props.sensor_readings.adc_1_0_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'1_1'} label='Bd 1 ch 1' value={props.sensor_readings.adc_1_1_1_860} units={props.sensor_readings.adc_1_1_1_860_units} direction={props.sensor_readings.adc_1_1_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'1_2'} label='Bd 1 ch 2' value={props.sensor_readings.adc_1_2_1_860} units={props.sensor_readings.adc_1_2_1_860_units} direction={props.sensor_readings.adc_1_2_1_860_direction} />
            <RenderADCValueWithDirection gridArea={'1_3'} label='Bd 1 ch 3' value={props.sensor_readings.adc_1_3_1_860} units={props.sensor_readings.adc_1_3_1_860_units} direction={props.sensor_readings.adc_1_3_1_860_direction} />
        </Grid>
    return (ret)
}

export default RenderADCTextStatus;



