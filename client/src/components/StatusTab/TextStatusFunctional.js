import React from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import {Box} from "grommet";
import RenderStateTextStatus from "./StateTextStatusFunctional";
import RenderInterventionsTextStatus from "./InterventionsTextStatusFunctional";
import RenderSecurityTextStatus from "./SecurityTextStatusFunctional";
import RenderEnvironmentTextStatus from "./EnvironmentTextStatusFunctional";

function RenderTextStatus (props) {
    console.log("RenderTextStatus state = "+JSON.stringify(props.state))

    let ret =
        <Grid round={'small'} direction={'vertical'}
              areas={[
                  { name: 'environment', start: [0, 0], end: [0, 0] },
                  { name: 'state', start: [0, 1], end: [0, 1] },
                  { name: 'security', start: [0, 2], end: [0, 2] },
                  { name: 'interventions', start: [0, 3], end: [0, 3] },
              ]}
              columns={['large']}
              rows={['240px','small','small','small']}
              gap={"xxsmall"}
        >
            <Box gridArea={'environment'} >
                <RenderEnvironmentTextStatus  settings={props.settings} state={props.state}/>
            </Box>
            <Box gridArea={'state'} >
                <RenderStateTextStatus settings={props.settings} state={props.state}/>
            </Box>
            <Box gridArea={'security'} >
                <RenderSecurityTextStatus  settings={props.settings} state={props.state}/>
            </Box>
            <Box gridArea={'interventions'} >
                <RenderInterventionsTextStatus  settings={props.settings} state={props.state}/>
            </Box>
        </Grid>
    return (ret)
}

export default RenderTextStatus;



