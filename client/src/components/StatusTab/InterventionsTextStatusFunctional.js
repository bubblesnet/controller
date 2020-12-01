import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow} from 'grommet';
import '../../App.css';
import {Box} from "grommet";

function RenderStateTextStatus (props) {
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

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

    let ret =
        <Grid id={"current-status-holder"}
              justify={'center'}
              round={'small'}
              direction={'vertical'}
              fill
              areas={[
                  { name: 'plant', start: [0, 0], end: [0, 0] },
                  { name: 'light', start: [0, 1], end: [0, 1] },
                  { name: 'stage', start: [0, 1], end: [0, 1] },
              ]}
              columns={['large']}
              rows={['small','small','small','small']}
              gap={"xxsmall"} >
                        <Box gridArea={'plant'}>Plant Height</Box><Box>{values.plantHeight}</Box>
                        <Box gridArea={'light'}>Light Schedule</Box><Box>{values.lightSchedule}</Box>
                        <Box gridArea={'stage'}>
                            <Box>Stage</Box><Box>{values.stage}</Box>
                            <Box gridArea={'plant-status'}>Current Stage Started</Box><Box>{values.currentStageStarted}</Box>
                            <Box gridArea={'plant-status'}>Next Stage Starts</Box><Box>{values.nextStageStarts}</Box>
                        </Box>
        </Grid>
    return (ret)
}

export default RenderStateTextStatus;



