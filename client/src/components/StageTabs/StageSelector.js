import {Box, Grid, Select} from "grommet";
import React, {useState} from "react";

import stage_options from "../../stage_options.json"
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderStageSelector (props) {
/*
    function setCurrentStageValue(option) {
        let x = local_station;
        log.trace("current stage value " +x.current_stage + " new stage value " + option)
        x.current_stage = option
        props.setStateFromChild(JSON.parse(JSON.stringify(x)))
        setStation(x)
    }
*/
    function setSelectedStageValue(option) {
        let x = local_station;
        log.trace("selected stage value " +x.current_stage + " new stage value " + option)
        x.current_stage = option
        props.setSelectedStageFromChild(option)
        setStation(x)
    }

    const [local_station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));

    log.trace("rendering with value={"+props.automation_setting.stage_name+"}")
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
                    <Select options={stage_options} value={props.automation_setting.stage_name}
                            onChange={({ option }) => setSelectedStageValue(option)} />
                </Box>
          </Grid>
   </>
    return(ret);
}

export default RenderStageSelector;

