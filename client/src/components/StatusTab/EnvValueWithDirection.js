import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow,TableCell} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";

function RenderEnvValueWithDirection (props) {
    let label_area=props.gridArea+""+"-label"
    let value_area=props.gridArea+""+"-value"
    let direction_area=props.gridArea+""+"-direction"

    let className = ''
    if(props.direction === 'up') {
        className='zero-arrowup-icon'
    }
    if(props.direction === 'down') {
        className='zero-arrowdown-icon'
    }
    let valuestr = props.value + props.units
    let ret = ""

    if( props.exists === false ) {
        ret = <></>
    } else {
        ret = <>
            <Box gridArea={label_area}>{props.label}</Box>
            <Box gridArea={value_area}>{valuestr}</Box>
            <Box gridArea={direction_area}>
                <div className={className}/>
            </Box>
        </>
    }
    return( ret )
}
export default RenderEnvValueWithDirection;