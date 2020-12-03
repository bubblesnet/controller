import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow,TableCell} from 'grommet';
import '../../App.css';
import './statusTab.css'
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

    /*
    let ret =
        <Grid id={'current-status-holder'}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'plant-label', start: [0, 0], end: [0, 0] },{ name: 'plant-va]ue', start: [1, 0], end: [1, 0] },
                  { name: 'light-label', start: [0, 1], end: [0, 1] },{ name: 'light-value', start: [1, 1], end: [1, 1] },
                  { name: 'stage-label', start: [0, 2], end: [0, 2] },{ name: 'stage-value', start: [1, 2], end: [1, 2] },
                  { name: 'stage-current-label', start: [0, 3], end: [0, 3] },{ name: 'stage-current-value', start: [1, 3], end: [1, 3] },
                  { name: 'stage-next-label', start: [0, 4], end: [0, 4] },{ name: 'stage-next-value', start: [1, 4], end: [1, 4] },
              ]}
              columns={['large','small']}
              rows={['30px','30px','30px','30px','30px']}
              gap={"xxsmall"} >
            <Box gridArea={'plant-label'}>Height</Box><Box gridArea={'plant-value'}>{values.plantHeight}</Box>
            <Box gridArea={'light-label'}>Light Schedule</Box><Box gridArea={'light-value'}>{values.lightSchedule}</Box>
            <Box gridArea={'stage-label'}>Stage</Box><Box gridArea={'stage-value'}>{values.stage}</Box>
            <Box gridArea={'stage-current-label'}>Current Stage Started</Box><Box gridArea={'stage-current-value'}>{values.currentStageStarted}</Box>
            <Box gridArea={'stage-next-label'}>Next Stage Starts</Box><Box gridArea={'stage-next-value'}>{values.nextStageStarts}</Box>
        </Grid>


    let ret =
        <Grid
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'plant-label', start: [0, 0], end: [0, 0] },{ name: 'plant-va]ue', start: [1, 0], end: [1, 0] },
             ]}
              columns={['xsmall','xsmall']}
              rows={['30px']}
              gap={"xxsmall"} >
            <Box gridArea={'plant-label'}>Height</Box>
            <Box gridArea={'plant-value'}>{values.plantHeight}</Box>
        </Grid>
                  return (ret)

     */

 let ret =
     <Grid className={'status-table-holder'} round={'small'} direction={'vertical'}
        areas={[
            { name: 'table-label', start: [0, 0], end: [1, 0] },
            { name: 'plant-label', start: [0, 1], end: [0, 1] }, { name: 'plant-value', start: [1, 1], end: [1, 1] },
            { name: 'light-schedule-label', start: [0, 2], end: [0, 2] }, { name: 'light-schedule-value', start: [1, 2], end: [1, 2] },
            { name: 'stage-label', start: [0, 3], end: [0, 3] }, { name: 'stage-value', start: [1, 3], end: [1, 3] },
            { name: 'stage-current-label', start: [0, 4], end: [0, 4] }, { name: 'stage-current-value', start: [1, 4], end: [1, 4] },
            { name: 'next-stage-label', start: [0, 5], end: [0, 5] }, { name: 'next-stage-value', start: [1, 5], end: [1, 5] },
        ]}
        columns={['small', 'medium']}
        rows={['40px','20px','20px','20px','20px','20px']}
        gap={"xxsmall"} >

        <Box gridArea={'table-label'}>Current Plant State</Box>
        <Box gridArea={'plant-label'}>Plant height</Box><Box gridArea={'plant-value'}>{values.plantHeight}</Box>
        <Box gridArea={'light-schedule-label'}>Light schedule</Box><Box gridArea={'light-schedule-value'}>{values.lightSchedule}</Box>
        <Box gridArea={'stage-label'}>Current stage</Box><Box gridArea={'stage-value'}>{values.stage}</Box>
        <Box gridArea={'stage-current-label'}>Current stage started</Box><Box gridArea={'stage-current-value'}>{values.currentStageStarted}</Box>
        <Box gridArea={'next-stage-label'}>Next stage starts</Box><Box gridArea={'next-stage-value'}>{values.nextStageStarts}</Box>
     </Grid>
    return( ret );
}

export default RenderStateTextStatus;