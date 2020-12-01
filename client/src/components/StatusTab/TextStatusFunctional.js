import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow} from 'grommet';
import '../../App.css';
import {Box} from "grommet";
import RenderStateTextStatus from "./StateTextStatusFunctional";
import RenderInterventionsTextStatus from "./InterventionsTextStatusFunctional";
import RenderSecurityTextStatus from "./SecurityTextStatusFunctional";
import RenderEnvironmentTextStatus from "./EnvironmentTextStatusFunctional";


function RenderTextStatus (props) {
    let initValues = {
        stage: "Vegetative",
        lightSchedule: "12/12",
        lastWaterChange: "10 days ago",
        powerConsumption: "40W",
        cabinetDoor: "Closed",
        outerDoor: "Closed",
        lastTraining: "17 days ago",
        lastFilterChange: "never",
        currentStageStarted: "25 days ago",
        nextStageStarts: "10 days",
        airTempTop: "84F",
        airTempMiddle: "81F",
        airTempBottom: "79F",
        waterTemp: "70F",
        plantHeight: "37in"
    };
    /*
                            <Box gridArea={'plant-status'}>Last Training</Box><Box>{values.lastTraining}</Box>
                        <Box gridArea={'plant-status'}>Last Water Change</Box><Box>{values.lastWaterChange}</Box>
                        <Box gridArea={'plant-status'}>Cabinet Door</Box><Box>{values.cabinetDoor}</Box>
                        <Box gridArea={'plant-status'}>Outer Door</Box><Box>{values.outerDoor}</Box>
                        <Box gridArea={'plant-status'}>Last Filter Change</Box><Box>{values.lastFilterChange}</Box>
                        <Box gridArea={'plant-status'}>Power Consumption</Box><Box>{values.powerConsumption}</Box>

            <RenderSecurityTextStatus gridArea={'security'} />
            <RenderInterventionsTextStatus gridArea={'interventions'} />
               <Box gridArea={'security'}>
                <RenderEnvironmentTextStatus />
            </Box>
            <Box gridArea={'interventions'}>
                <RenderEnvironmentTextStatus />
            </Box>
 */

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

    let ret =
        <Grid
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'state', start: [0, 0], end: [0, 0] },
                  { name: 'environment', start: [0, 1], end: [0, 1] },
                  { name: 'security', start: [0, 2], end: [0, 2] },
                  { name: 'interventions', start: [0, 3], end: [0, 3] },
              ]}
              columns={['large']}
              rows={['small','small','small','small']}
              gap={"xxsmall"}
        >
            <Box gridArea={'state'}>
                <RenderStateTextStatus />
            </Box>
            <Box gridArea={'environment'} background={'yellow'}>
                <RenderEnvironmentTextStatus />
            </Box>

                </Grid>
    return (ret)
}

export default RenderTextStatus;



