import React from "react";

import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import sprintf from 'sprintf-js'

/// TODO check copyright and license

function RenderADCValueWithDirection (props) {
//    console.log("RenderADCValueWithDirection")
    let label_area= `${props.gridArea}-label`
    let value_area= `${props.gridArea}-value`
    let direction_area=`${props.gridArea}-direction`

    let className = ''
    if(props.direction === 'up') {
        className='zero-arrowup-icon'
    }
    if(props.direction === 'down') {
        className='zero-arrowdown-icon'
    }
    let valuestr = ""
    if( typeof props.value !== 'undefined' ) {
        valuestr = sprintf.sprintf( "%.3f %s", props.value, props.units )
    }
    let ret =''

    if( props.exists === false ) {
//        console.log("RenderADCValueWithDirection props.exists === false")
        ret = <></>
    } else {
//        console.log(`RenderADCValueWithDirection valuestr === ${valuestr} props === ${JSON.stringify(props)}`)
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
export default RenderADCValueWithDirection;