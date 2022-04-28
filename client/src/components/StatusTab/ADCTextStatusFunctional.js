/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import RenderADCValueWithDirection from './ADCValueWithDirection'

// copyright and license inspection - no issues 4/13/22

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



