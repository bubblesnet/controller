import {Box, Grid, Select, TableCell, TableRow} from "grommet";
import React from "react";

function RenderLightSelector (props) {
    let ret = <>
            <Grid
                round={'xxsmall'}
                direction={'horizontal'}
                fill
                areas={[
                    { name: 'type', start: [0, 0], end: [0, 0] },
                    { name: 'schedule', start: [1, 0], end: [1, 0] },
                ]}
                columns={['240px','240px']}
                rows={['60px']}
                gap="xxsmall"
            >

            <Box width={'small'} round={'xsmall'} >
            Light Schedule
            <Select options={props.state.automation_settings.lighting_schedule_options} value={props.state.automation_settings.current_lighting_schedule}/>
            </Box>
            <Box width={'small'} round={'small'} >
            Light Type
            <Select options={props.state.automation_settings.light_type_options} value={props.state.automation_settings.current_light_type} />
            </Box>
            </Grid>
   </>
    return(ret);
}

export default RenderLightSelector;

