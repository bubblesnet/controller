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
            <Select options={["24hr", "18/6", "14/10", "12/12"]} value={'12/12'}/>
            </Box>
            <Box width={'small'} round={'small'} >
            Light Type
            <Select options={['Grow Light Veg', 'Grow Light Bloom', 'Germination Light']} value={'Grow Light Veg'} />
            </Box>
            </Grid>
   </>
    return(ret);
}

export default RenderLightSelector;

