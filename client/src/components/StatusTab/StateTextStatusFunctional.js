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
import sprintf from 'sprintf-js'
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderStateTextStatus (props) {

    log.trace("RenderStateTextStatus")
    let plant_height = sprintf.sprintf("%.1f", props.sensor_readings.plant_height)
 let ret =
     <Grid className={'status-table-holder'} round={'small'} direction={'vertical'}
        areas={[
            { name: 'table-label', start: [0, 0], end: [2, 0] },
            { name: 'plant-label', start: [0, 1], end: [0, 1] }, { name: 'plant-value', start: [1, 1], end: [1, 1] },
            { name: 'light-schedule-label', start: [0, 2], end: [0, 2] }, { name: 'light-schedule-value', start: [1, 2], end: [1, 2] },
            { name: 'light-cycle-label', start: [0, 3], end: [0, 3] }, { name: 'light-cycle-value', start: [1, 3], end: [1, 3] },
            { name: 'stage-label', start: [0, 4], end: [0, 4] }, { name: 'stage-value', start: [1, 4], end: [1, 4] },
            { name: 'stage-current-label', start: [0, 5], end: [0, 5] }, { name: 'stage-current-value', start: [1, 5], end: [1, 5] },
            { name: 'next-stage-label', start: [0, 6], end: [0, 6] }, { name: 'next-stage-value', start: [1, 6], end: [1, 6] },
        ]}
        columns={['medium', 'small', 'xxsmall']}
        rows={['40px','20px','20px','20px','20px','20px','20px']}
        gap={"xxsmall"} >

        <Box gridArea={'table-label'}>Current Plant State</Box>
        <Box gridArea={'plant-label'}>Plant height</Box><Box gridArea={'plant-value'}>{plant_height} {props.display_settings.plant_height_units}</Box>
        <Box gridArea={'light-schedule-label'}>Light schedule</Box><Box gridArea={'light-schedule-value'}>{props.automation_settings.current_lighting_schedule}</Box>
         <Box gridArea={'light-cycle-label'}>Light cycle starts</Box><Box gridArea={'light-cycle-value'}>{'10 AM EST'}</Box>
        <Box gridArea={'stage-label'}>Current stage</Box><Box gridArea={'stage-value'}>{props.station.current_stage}</Box>
        <Box gridArea={'stage-current-label'}>Current stage started</Box><Box gridArea={'stage-current-value'}>{props.various_dates.start_date_current_stage}</Box>
        <Box gridArea={'next-stage-label'}>Next stage starts</Box><Box gridArea={'next-stage-value'}>{props.various_dates.start_date_next_stage}</Box>
     </Grid>
    return( ret );
}

export default RenderStateTextStatus;