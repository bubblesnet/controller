import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow,TableCell} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";

function RenderEnvValueWithDirection (props) {

    let [direction, setDirection] = useState(props.direction); //
    let [label, setLabel] = useState(props.label); //
    let [value, setValue] = useState(props.value);
    let [units, setUnits] = useState(props.units);
    let [gridArea, setGridArea] = useState(props.gridArea); //

    let label_area=gridArea+""+"-label"
    let value_area=gridArea+""+"-value"
    let direction_area=gridArea+""+"-direction"

    let className = ''
    if(direction === 'up') {
        className='zero-arrowup-icon'
    }
    if(direction === 'down') {
        className='zero-arrowdown-icon'
    }

    let ret = <>
        <Box gridArea={label_area}>{label}</Box>
        <Box gridArea={value_area}>{value}{units}</Box>
        <Box gridArea={direction_area}><div className={className} /></Box>
        </>
    return( ret )
}
export default RenderEnvValueWithDirection;