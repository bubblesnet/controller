import React, {useEffect, useState} from "react";
import Switch from "react-input-switch";
import {TableRow,TableCell} from "grommet";
import './controlTab.css'


function RenderDeviceSwitch (props) {
//    console.log("RenderDeviceSwitch "+props.onOff)

    const [onoff,setOnoff] = useState(props.onOff);

    function toggle(e) {
        if( props.automaticControl === props.off ) {
            if (onoff === props.off) {
                setOnoff(props.on)
            } else {
                setOnoff(props.off)
            }
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
    console.log("rendering switch with value " + props.onOff )
    let ret =
        <TableRow ><TableCell>{props.label}</TableCell><TableCell>
            <Switch on={props.on} off={props.off} value={onoff}
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
                    }} onChange={toggle} />
        </TableCell></TableRow>
    return (ret)
}

export default RenderDeviceSwitch;
