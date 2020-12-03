import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow} from 'grommet';
import '../../App.css';
import {Box} from "grommet";
import RenderStateTextStatus from "./StateTextStatusFunctional";
import RenderInterventionsTextStatus from "./InterventionsTextStatusFunctional";
import RenderSecurityTextStatus from "./SecurityTextStatusFunctional";
import RenderEnvironmentTextStatus from "./EnvironmentTextStatusFunctional";
import {useTheme} from 'rendition'

function RenderTextStatus (props) {
    let initValues = {
    };

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

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
            <Box gridArea={'state'} >
                <RenderStateTextStatus />
            </Box>
            <Box gridArea={'environment'} >
                <RenderEnvironmentTextStatus />
            </Box>
            <Box gridArea={'security'} >
                <RenderSecurityTextStatus />
            </Box>
            <Box gridArea={'interventions'} >
                <RenderInterventionsTextStatus />
            </Box>
        </Grid>
    return (ret)
}

export default RenderTextStatus;



