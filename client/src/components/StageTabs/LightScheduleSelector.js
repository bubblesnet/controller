import {Box, Grid, Select} from "grommet";
import React, {useState} from "react";

function RenderLightSelector (props) {

    function setLightTypeValue(value) {
        let x = local_state;
        x.automation_settings.current_light_type = value;
        setState(JSON.parse(JSON.stringify(x)))
    }
    function setLightScheduleValue(value) {
        let x = local_state;
        x.automation_settings.current_lighting_schedule = value;
        setState(JSON.parse(JSON.stringify(x)))
    }

    const [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));

    const changeLightType = event => setLightTypeValue(event.target.value);
    const changeLightSchedule = event => setLightScheduleValue(event.target.value);

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
            <Select options={local_state.automation_settings.lighting_schedule_options} value={local_state.automation_settings.current_lighting_schedule} onChange={changeLightSchedule}/>
            </Box>
            <Box width={'small'} round={'small'} >
            Light Type
            <Select options={local_state.automation_settings.light_type_options} value={local_state.automation_settings.current_light_type} onChange={changeLightType}/>
            </Box>
            </Grid>
   </>
    return(ret);
}

export default RenderLightSelector;

