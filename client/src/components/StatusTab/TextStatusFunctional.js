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
import {Box} from "grommet";
import RenderStateTextStatus from "./StateTextStatusFunctional";
import RenderInterventionsTextStatus from "./InterventionsTextStatusFunctional";
import RenderSecurityTextStatus from "./SecurityTextStatusFunctional";
import RenderEnvironmentTextStatus from "./EnvironmentTextStatusFunctional";
import RenderADCTextStatus from "./ADCTextStatusFunctional";

// copyright and license inspection - no issues 4/13/22

function RenderTextStatus (props) {
    console.log("RenderTextStatus")

    console.log("TextStatusFunctional display_settings.co2_units = " + props.display_settings.co2_units)
    let ret =
        <Grid round={'small'} direction={'vertical'}
              areas={[
                  { name: 'environment', start: [0, 0], end: [0, 0] },
                  { name: 'state', start: [0, 1], end: [0, 1] },
                  { name: 'security', start: [0, 2], end: [0, 2] },
                  { name: 'interventions', start: [0, 3], end: [0, 3] },
                  { name: 'adc', start: [0, 4], end: [0, 4] },
              ]}
              columns={['large']}
              rows={['300px','small','small','small','small']}
              gap={"xxsmall"}
        >
            <Box gridArea={'environment'} >
                <RenderEnvironmentTextStatus station_settings={props.station}
                                             sensor_readings={props.sensor_readings}
                                             display_settings={props.display_settings}
                                             automation_settings={props.automation_settings}
                                             settings={props.settings}
                                             />
            </Box>
            <Box gridArea={'state'} >
                <RenderStateTextStatus station={props.station}
                                       sensor_readings={props.sensor_readings}
                                       display_settings={props.display_settings}
                                       automation_settings={props.automation_settings}
                                       settings={props.settings}
                                       various_dates={props.various_dates}/>
            </Box>
            <Box gridArea={'security'} >
                <RenderSecurityTextStatus station_settings={props.station}
                                          sensor_readings={props.sensor_readings}
                                          display_settings={props.display_settings}
                                          automation_settings={props.automation_settings}
                                          settings={props.settings}
                                          />
            </Box>
            <Box gridArea={'interventions'} >
                <RenderInterventionsTextStatus station_settings={props.station}
                                               sensor_readings={props.sensor_readings}
                                               display_settings={props.display_settings}
                                               automation_settings={props.automation_settings}
                                               settings={props.settings}
                                               />
            </Box>
            <Box gridArea={'adc'} >
                <RenderADCTextStatus station_settings={props.station}
                                     sensor_readings={props.sensor_readings}
                                     display_settings={props.display_settings}
                                     automation_settings={props.automation_settings}
                                     settings={props.settings}
                                     />
            </Box>
        </Grid>
    return (ret)
}

export default RenderTextStatus;



