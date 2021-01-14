import React, {useState} from 'react';
import {Grid} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";

function RenderStateTextStatus (props) {

    let [state, setState] = useState(props.state); //
    let [settings, setSettings] = useState(props.settings); //

    console.log("RenderStateTextStatus")
 let ret =
     <Grid className={'status-table-holder'} round={'small'} direction={'vertical'}
        areas={[
            { name: 'table-label', start: [0, 0], end: [2, 0] },
            { name: 'plant-label', start: [0, 1], end: [0, 1] }, { name: 'plant-value', start: [1, 1], end: [1, 1] },
            { name: 'light-schedule-label', start: [0, 2], end: [0, 2] }, { name: 'light-schedule-value', start: [1, 2], end: [1, 2] },
            { name: 'light-cycle-label', start: [0, 3], end: [0, 3] }, { name: 'light-cycle-value', start: [1, 3], end: [1, 3] },
            { name: 'stage-label', start: [0, 4], end: [0, 4] }, { name: 'stage-value', start: [1, 4], end: [1, 4] },
            { name: 'stage-current-label', start: [0, 5], end: [0, 5] }, { name: 'stage-current-value', start: [1, 5], end: [1, 5] },
            { name: 'next-stage-label', start: [0, 6], end: [0, 6] }, { name: 'next-stage-value', start: [1, 6], end: [1, 6] },
        ]}
        columns={['medium', 'small', 'xxsmall']}
        rows={['40px','20px','20px','20px','20px','20px','20px']}
        gap={"xxsmall"} >

        <Box gridArea={'table-label'}>Current Plant State</Box>
        <Box gridArea={'plant-label'}>Plant height</Box><Box gridArea={'plant-value'}>{state.status.plant_height} {settings.display_settings.plant_height_units}</Box>
        <Box gridArea={'light-schedule-label'}>Light schedule</Box><Box gridArea={'light-schedule-value'}>{state.automation_settings.current_lighting_schedule}</Box>
         <Box gridArea={'light-cycle-label'}>Light cycle starts</Box><Box gridArea={'light-cycle-value'}>{'10 AM EST'}</Box>
        <Box gridArea={'stage-label'}>Current stage</Box><Box gridArea={'stage-value'}>{state.automation_settings.current_stage}</Box>
        <Box gridArea={'stage-current-label'}>Current stage started</Box><Box gridArea={'stage-current-value'}>{state.status.start_date_current_stage}</Box>
        <Box gridArea={'next-stage-label'}>Next stage starts</Box><Box gridArea={'next-stage-value'}>{state.status.start_date_next_stage}</Box>
     </Grid>
    return( ret );
}

export default RenderStateTextStatus;