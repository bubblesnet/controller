import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";

function RenderSecurityTextStatus (props) {
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
        plantHeight: "37in",
        internalPressure: '1018h',
        externalPressure: '1021h',
    };

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

    let ret =
        <Grid className={"status-table-holder"} round={'small'} direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [1, 0] },
                  { name: 'outer-door-label', start: [0, 1], end: [0, 1] },{ name: 'outer-door-value', start: [1, 1], end: [1, 1] },
                  { name: 'cabinet-door-label', start: [0, 2], end: [0, 2] },{ name: 'cabinet-door-value', start: [1, 2], end: [1, 2] },
                  { name: 'external-pressure-label', start: [0, 3], end: [0, 3] },{ name: 'external-pressure-value', start: [1, 3], end: [1, 3] },
                  { name: 'internal-pressure-label', start: [0, 4], end: [0, 4] },{ name: 'internal-pressure-value', start: [1, 4], end: [1, 4] },
              ]}
              columns={['small','medium']}
              rows={['40px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>Security</Box>
            <Box gridArea={'outer-door-label'}>Outer Door</Box><Box gridArea={'outer-door-value'}>{values.outerDoor}</Box>
            <Box gridArea={'cabinet-door-label'}>Cabinet Door</Box><Box gridArea={'cabinet-door-value'}>{values.cabinetDoor}</Box>
            <Box gridArea={'external-pressure-label'}>External Pressure</Box><Box gridArea={'external-pressure-value'}>{values.externalPressure}</Box>
            <Box gridArea={'internal-pressure-label'}>Internal Pressure</Box><Box gridArea={'internal-pressure-value'}>{values.internalPressure}</Box>
        </Grid>
    return (ret)
}

export default RenderSecurityTextStatus;



