import React from "react";
import Switch from "react-input-switch";
import {TableRow,TableCell} from "grommet";
import './controlTab.css'


function RenderDeviceSwitch (props) {
    function toggle(e) {
        if( props.automaticControl === props.off ) {
            if(props.label === "Heater") {
                console.log("1 thestate toggling switch " + props.label + " from " + props.onOff)
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
    if(props.label === "Heater") {
        console.log("13 thestate rendering switch " + props.label + " with value " + props.onOff)
    }
    let ret

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
