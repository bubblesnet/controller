import {Box, Button, Grid, Select, TableCell, TableRow} from "grommet";
import React from "react";

function RenderFormActions (props) {
    let ret = <>
            <Grid
                justify={'center'}
                round={'xxsmall'}
                direction={'horizontal'}
                fill
                areas={[
                    { name: 'apply', start: [0, 0], end: [0, 0] },
                    { name: 'reset', start: [1, 0], end: [1, 0] },
                    { name: 'defaults', start: [2, 0], end: [2, 0] },
                ]}
                columns={['small','small','small']}
                rows={['60px']}
                gap="xxsmall"
            >

                <Button gridArea={'apply'} color={'control'} width={'medium'} round={'large'} active={true} label={'Apply'} primary onClick={props.applyAction}>
                </Button>
                <Button gridArea={'reset'} color={'control'} width={'medium'} round={'large'} active={true} label={'Reset'}>
                </Button>
                <Button gridArea={'defaults'} color={'control'} width={'medium'} round={'large'} active={true} label={'Defaults'}>
                </Button>
         </Grid>
   </>
    return(ret);
}

export default RenderFormActions;

