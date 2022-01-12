import React from "react";
import Switch from "react-input-switch";
import {TableRow,TableCell} from "grommet";
import './controlTab.css'

var slideclick_valid = new Audio("slideclick_valid.mp3");
var slideclick_invalid = new Audio("slideclick_invalid.mp3");

function goodbeep() {
    slideclick_valid.play()
}
function badbeep() {
    slideclick_invalid.play()
}
function RenderDeviceSwitch (props) {
    function toggle(e) {
        console.log("changing = " + props.changing)
        if( props.automaticControl === props.off && props.changing === false) {
            props.toggle(e)
            goodbeep();
        } else {
            badbeep();
        }
    }

    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'

    if( props.changing === true ) {
        trackBackgroundColor = 'grey'
        trackCheckedColor = 'grey'
        buttonBackgroundColor = 'grey'
        buttonCheckedColor = 'grey'
    } else if( props.automaticControl === props.on ) {
        trackBackgroundColor = 'red'
        trackCheckedColor = 'green'
        buttonBackgroundColor = 'red'
        buttonCheckedColor = 'green'
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
