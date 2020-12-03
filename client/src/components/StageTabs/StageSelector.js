import {Box, Button, Grid, Select, TableCell, TableRow} from "grommet";
import React from "react";

function RenderStageSelector (props) {
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
                    <Select options={["Germinate", "Vegetative", "Bloom", "Harvest", "Dry", "Idle"]} value={"Germinate"}/>
                </Box>
                <Box justify={'center'} gridArea={'setcurrent'} width={'small'} >
                    <Button gridArea={'apply'} color={'control'} width={'medium'} round={'large'} active={'false'} label={'Set Current'} primary />
                </Box>
         </Grid>
   </>
    return(ret);
}

export default RenderStageSelector;

