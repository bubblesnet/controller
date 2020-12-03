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
        humidity: "67%",
        externalHumidity: "42%",
        nextStageStarts: "10 days",
        externalAirTemp: "64F",
        airTempTop: "84F",
        airTempMiddle: "81F",
        airTempBottom: "79F",
        waterTemp: "70F",
        plantHeight: "37in",
        ph: "6.0"
    };

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

    let ret =
        <Grid className={'status-table-holder'}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [1, 0] },
                  { name: 'external-air-temp-label', start: [0, 1], end: [0, 1] }, { name: 'external-air-temp-value', start: [1, 1], end: [1, 1] },
                  { name: 'air-temp-top-label', start: [0, 2], end: [0, 2] }, { name: 'air-temp-top-value', start: [1, 2], end: [1, 2] },
                  { name: 'air-temp-middle-label', start: [0, 3], end: [0, 3] }, { name: 'air-temp-middle-value', start: [1, 3], end: [1, 3] },
                  { name: 'air-temp-bottom-label', start: [0, 4], end: [0, 4] }, { name: 'air-temp-bottom-value', start: [1, 4], end: [1, 4] },
                  { name: 'water-temp-label', start: [0, 5], end: [0, 5] }, { name: 'water-temp-value', start: [1, 5], end: [1, 5] },
                  { name: 'root-ph-label', start: [0, 6], end: [0, 6] }, { name: 'root-ph-value', start: [1, 6], end: [1, 6] },
                  { name: 'humidity-label', start: [0, 7], end: [0, 7] }, { name: 'humidity-value', start: [1, 7], end: [1, 7] },
                  { name: 'external-humidity-label', start: [0, 8], end: [0, 8] }, { name: 'external-humidity-value', start: [1, 8], end: [1, 8] },
              ]}
              columns={['small', 'medium']}
              rows={['40px','20px','20px','20px','20px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>Environment</Box>
            <Box gridArea={'external-air-temp-label'}>External Air Temp</Box><Box gridArea={'external-air-temp-value'}>{values.externalAirTemp}</Box>
            <Box gridArea={'air-temp-top-label'}>Air Temp Top</Box><Box gridArea={'air-temp-top-value'}>{values.airTempTop}</Box>
            <Box gridArea={'air-temp-middle-label'}>Air Temp Middle</Box><Box gridArea={'air-temp-middle-value'}>{values.airTempMiddle}</Box>
            <Box gridArea={'air-temp-bottom-label'}>Air Temp Bottom</Box><Box gridArea={'air-temp-bottom-value'}>{values.airTempBottom}</Box>
            <Box gridArea={'water-temp-label'}>Water Temp</Box><Box gridArea={'water-temp-value'}>{values.waterTemp}</Box>
            <Box gridArea={'root-ph-label'}>Root pH</Box><Box gridArea={'root-ph-value'}>{values.ph}</Box>
            <Box gridArea={'humidity-label'}>Internal Humidity</Box><Box gridArea={'humidity-value'}>{values.humidity}</Box>
            <Box gridArea={'external-humidity-label'}>External Humidity</Box><Box gridArea={'external-humidity-value'}>{values.externalHumidity}</Box>
        </Grid>
    return (ret)
}

export default RenderStateTextStatus;



