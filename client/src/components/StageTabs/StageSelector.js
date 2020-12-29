import {Box, Button, Grid, Select} from "grommet";
import React, {useState} from "react";

function RenderStageSelector (props) {

    function setCurrentStageValue(option) {
        let x = local_state;
        console.log("current stage value " +x.automation_settings.current_stage + " new stage value " + option)
        x.automation_settings.current_stage = option
        props.setStateFromChild(JSON.parse(JSON.stringify(x)))
        setState(x)
    }

    const [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));

    let ret = <>
            <Grid
                justify={'center'}
                round={'xxsmall'}
                direction={'horizontal'}
                fill
                areas={[
                    { name: 'label', start: [0, 0], end: [0, 0] },
                    { name: 'stage', start: [1, 0], end: [1, 0] },
                    { name: 'setcurrent', start: [2, 0], end: [2, 0] },
                ]}
                columns={['100px','150px','226px']}
                rows={['60px']}
                gap="xxsmall"
            >

                <Box justify={'center'} gridArea={'label'} width={'small'} round={'xsmall'} >
                    Select Stage
                </Box>
                <Box justify={'center'} gridArea={'stage'} width={'small'} round={'xsmall'} >
                    <Select options={props.state.automation_settings.stage_options} value={local_state.automation_settings.current_stage}
                            onChange={({ option }) => setCurrentStageValue(option)} />
                </Box>
                <Box justify={'center'} gridArea={'setcurrent'} width={'small'} >
                    <Button gridArea={'apply'} color={'control'} width={'medium'} round={'large'} active={false} label={'Set Current'} primary />
                </Box>
         </Grid>
   </>
    return(ret);
}

export default RenderStageSelector;

