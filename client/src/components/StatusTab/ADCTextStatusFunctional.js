import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import RenderADCValueWithDirection from './ADCValueWithDirection'

function RenderADCTextStatus (props) {
    console.log('RenderADCTextStatus temp='+props.state.status.temp_air_middle)
    let ret =
        <Grid className={'status-table-holder'}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [2, 0] },
                  { name: '1_1-label', start: [0, 1], end: [0, 1] }, { name: '1_1-value', start: [1, 1], end: [1, 1] }, { name: '1_1-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_2-label', start: [0, 1], end: [0, 1] }, { name: '1_2-value', start: [1, 1], end: [1, 1] }, { name: '1_2-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_3-label', start: [0, 1], end: [0, 1] }, { name: '1_3-value', start: [1, 1], end: [1, 1] }, { name: '1_3-direction', start: [2, 1], end: [2, 1] },
                  { name: '1_4-label', start: [0, 1], end: [0, 1] }, { name: '1_4-value', start: [1, 1], end: [1, 1] }, { name: '1_4-direction', start: [2, 1], end: [2, 1] },
                  { name: '2_1-label', start: [0, 1], end: [0, 1] }, { name: '2_1-value', start: [1, 1], end: [1, 1] }, { name: '2_1-direction', start: [2, 1], end: [2, 1] },
                  { name: '2_2-label', start: [0, 1], end: [0, 1] }, { name: '2_2-value', start: [1, 1], end: [1, 1] }, { name: '2_2-direction', start: [2, 1], end: [2, 1] },
                  { name: '2_3-label', start: [0, 1], end: [0, 1] }, { name: '2_3-value', start: [1, 1], end: [1, 1] }, { name: '2_3-direction', start: [2, 1], end: [2, 1] },
                  { name: '2_4-label', start: [0, 1], end: [0, 1] }, { name: '2_4-value', start: [1, 1], end: [1, 1] }, { name: '2_4-direction', start: [2, 1], end: [2, 1] },
              ]}
              columns={['medium', 'small','xxsmall']}
              rows={['40px','20px','20px','20px','20px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>ADC</Box>
            <RenderADCValueWithDirection gridArea={'1_1'} label='1_1' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'1_2'} label='1_2' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'1_3'} label='1_3' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'1_4'} label='1_4' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'2_1'} label='2_1' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'2_2'} label='2_2' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'2_3'} label='2_3' value={"1.245"} units={"Volts"} direction={"up"} />
            <RenderADCValueWithDirection gridArea={'2_4'} label='2_4' value={"1.245"} units={"Volts"} direction={"up"} />
        </Grid>
    return (ret)
}

export default RenderADCTextStatus;



