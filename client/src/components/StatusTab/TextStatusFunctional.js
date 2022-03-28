import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import {Box} from "grommet";
import RenderStateTextStatus from "./StateTextStatusFunctional";
import RenderInterventionsTextStatus from "./InterventionsTextStatusFunctional";
import RenderSecurityTextStatus from "./SecurityTextStatusFunctional";
import RenderEnvironmentTextStatus from "./EnvironmentTextStatusFunctional";
import RenderADCTextStatus from "./ADCTextStatusFunctional";
import log from "roarr";


function RenderTextStatus (props) {
    log.trace("RenderTextStatus")

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
              rows={['240px','small','small','small','small']}
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
                <RenderStateTextStatus station_settings={props.station}
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



