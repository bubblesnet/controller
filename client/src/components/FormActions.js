import {Box, Button, Grid, Select, TableCell, TableRow} from "grommet";
import React, {useState} from "react";

function RenderFormActions (props) {
    let [state, setState] = useState(props.state);

    function defaultsAction() {
        props.defaultsAction()
    }
    function resetAction() {
        props.resetAction();
    }
    function applyAction(e) {
        props.applyAction(state);
    }
    let applyDisabled = false
    if( props.applyButtonState === false ) {
        applyDisabled=true
    }
    let resetDisabled = false
    if( props.resetButtonState === false ) {
        resetDisabled=true
    }
    let defaultsDisabled = false
    if( props.defaultsButtonState === false ) {
        defaultsDisabled=true
    }
    let d = 'disabled'
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

                <Button gridArea={'apply'} color={'var(--color-button-border)'} disabled={applyDisabled} width={'medium'} round={'large'} active={props.applyButtonState} label={'Apply'} onClick={applyAction} />
                <Button gridArea={'reset'} color={'var(--color-button-border)'} disabled={resetDisabled} width={'medium'} round={'large'} type={'reset'} active={props.resetButtonState} label={'Reset'} onClick={resetAction}/>
                <Button gridArea={'defaults'} color={'var(--color-button-border)'} disabled={defaultsDisabled} width={'medium'} round={'large'} active={props.defaultsButtonState} label={'Defaults'} onClick={defaultsAction}/>
         </Grid>
   </>
    return(ret);
}

export default RenderFormActions;

