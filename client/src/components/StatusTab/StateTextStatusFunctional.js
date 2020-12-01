import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow,TableCell} from 'grommet';
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
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'plant', start: [0, 0], end: [0, 0] },
                  { name: 'light', start: [0, 1], end: [0, 1] },
                  { name: 'stage', start: [0, 2], end: [0, 2] },
              ]}
              columns={['large']}
              rows={['30px','30px','90px']}
              gap={"xxsmall"} >
            <Box gridArea={'plant'}>
                <Table><tbody><TableRow><TableCell>Plant Height</TableCell><TableCell>{values.plantHeight}</TableCell></TableRow></tbody></Table>
            </Box>
            <Box gridArea={'light'}>
                <Table><tbody><TableRow><TableCell>Light Schedule</TableCell><TableCell>{values.lightSchedule}</TableCell></TableRow></tbody></Table>
            </Box>
            <Box gridArea={'stage'}>
                <Table><tbody>
                <TableRow><TableCell>Stage</TableCell><TableCell>{values.stage}</TableCell></TableRow>
                <TableRow><TableCell>Current Stage Started</TableCell><TableCell>{values.currentStageStarted}</TableCell></TableRow>
                <TableRow><TableCell>Next Stage Starts</TableCell><TableCell>{values.nextStageStarts}</TableCell></TableRow>
                </tbody></Table>
            </Box>
        </Grid>
    return (ret)
}

export default RenderStateTextStatus;



