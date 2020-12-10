import {Box, Button, Grid, Select, TableCell, TableRow} from "grommet";
import React from "react";

function RenderFormActions (props) {
    // The color supplied to the button is the only way to make a border appear.
    let ret = <>
            <Grid
                margin={"medium"}
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
                rows={['40px']}
                gap={"small"}
            >

                <Button gridArea={'apply'} color={'var(--color-button-border)'} width={'medium'} round={'large'} active={true} label={'Apply'} primary onClick={props.applyAction} />
                <Button gridArea={'reset'} color={'var(--color-button-border)'} width={'medium'} round={'large'} type={'reset'} active={true} label={'Reset'} />
                <Button gridArea={'defaults'} color={'var(--color-button-border)'} width={'medium'} round={'large'} active={true} label={'Defaults'} />
         </Grid>
   </>
    return(ret);
}

export default RenderFormActions;

