import React, {useEffect, useState} from "react";
import Switch from "react-input-switch";
import {TableRow,TableCell} from "grommet";
import './controlTab.css'


function RenderDeviceSwitch (props) {
    function toggle(e) {
        if( props.automaticControl === props.off ) {
            props.toggle(e)
        }
    }

    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'

    if( props.automaticControl === props.on ) {
        trackBackgroundColor = 'red'
        trackCheckedColor = 'green'
        buttonBackgroundColor = 'red'
        buttonCheckedColor = 'green'
    }
//    console.log("rendering switch with value " + props.onOff )
    let ret = ""

        if( props.exists === false ) {
            ret = <></>
        } else {
            ret =
            <TableRow><TableCell>{props.label}</TableCell><TableCell>
                <Switch on={props.on} off={props.off} value={props.onOff}
                        styles={{
                            track: {
                                backgroundColor: trackBackgroundColor
                            },
                            trackChecked: {
                                backgroundColor: trackCheckedColor
                            },
                            button: {
                                backgroundColor: buttonBackgroundColor
                            },
                            buttonChecked: {
                                backgroundColor: buttonCheckedColor
                            }
                        }} onChange={toggle}/>
            </TableCell></TableRow>
        }
    return (ret)
}

export default RenderDeviceSwitch;
