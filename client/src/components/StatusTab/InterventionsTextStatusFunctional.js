import React, {useState} from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";

function RenderStateTextStatus (props) {
    let initValues = {
        stage: "vegetative",
        lightSchedule: "12/12",
        lastWaterChange: "10 days ago",
        powerConsumption: "40W",
        stationDoor: "Closed",
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

    let [values] = useState(initValues); //

    let ret =
        <Grid className={"status-table-holder"}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [2, 0] },
                  { name: 'training-label', start: [0, 1], end: [0, 1] },{ name: 'training-value', start: [1, 1], end: [1, 1] },
                  { name: 'water-change-label', start: [0, 2], end: [0, 2] },{ name: 'water-change-value', start: [1, 2], end: [1, 2] },
                  { name: 'filter-change-label', start: [0, 3], end: [0, 3] },{ name: 'filter-change-value', start: [1, 3], end: [1, 3] },
              ]}
              columns={['medium','small','xxsmall']}
              rows={['40px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
                    <Box gridArea={'table-label'}>Interventions</Box>
                    <Box gridArea={'training-label'}>Last Training</Box><Box gridArea={'training-value'}>{values.lastTraining}</Box>
                    <Box gridArea={'water-change-label'}>Last Water Change</Box><Box gridArea={'water-change-value'}>{values.lastWaterChange}</Box>
                    <Box gridArea={'filter-change-label'}>Last Filter Change</Box><Box gridArea={'filter-change-value'}>{values.lastFilterChange}</Box>
        </Grid>
    return (ret)
}

export default RenderStateTextStatus;



