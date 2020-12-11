import React, {useEffect, useState} from "react";
import {Grommet, Table, TableCell, TableRow} from "grommet";
import RenderDeviceSwitch from "./DeviceSwitchFunctional";
import Switch from "react-input-switch";
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const suggestions = Array(100)
    .fill()
    .map((_, i) => `suggestion ${i + 1}`);

const customTheme = deepMerge(grommet, {
    global: {
        input: {
            padding: {
                horizontal: 'small',
                vertical: 'medium',
            },
        },
    },
    textInput: {
        extend: () => `
      font-size: 20px;
      width: 300px;
      margin: 0 auto;

      &:focus {
        box-shadow: none;
        border-color: initial;
      }
    `,
        container: {
            extend: () => `
        height: 100px;
        width: 400px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        border-radius: 10px;
      `,
        },
        placeholder: {
            extend: () => `
        width: 100%;
        color: #1e1a11;
      `,
        },
        suggestions: {
            extend: () => `
        color: #3d3522;
        li {
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
      `,
        },
    },
});

function RenderSwitchPanel (props) {
    let [state, setState] = useState(props.state); //

    function toggleAutomatic(e) {
        props.switchControl.automaticControl.toggle(e)
    }

    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'
    let valuename = 'ON'
//    console.log("RenderSwitchPanel props = " + JSON.stringify(props))
    if(!props.switchControl.automaticControl.on)
        valuename = 'OFF'

    let ret =
            <Table ><tbody>
        <TableRow ><TableCell >Automatic Control</TableCell><TableCell>
            <Switch onChange={toggleAutomatic} on="ON" off="OFF" value={valuename}
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
            }}} />
            </TableCell></TableRow>

        <RenderDeviceSwitch toggle={props.switchControl.humidifier.toggle} on="ON" off="OFF" onOff={state.switch_state.humidifier.on?"ON":"OFF"} label='Humidifier' automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.heater.toggle} on="ON" off="OFF" onOff={state.switch_state.heater.on?"ON":"OFF"} label='Heater' automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.intakeFan.toggle} on="ON" off="OFF" onOff={state.switch_state.intakeFan.on?"ON":"OFF"} label='Intake Fan'  automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.exhaustFan.toggle} on="ON" off="OFF" onOff={state.switch_state.exhaustFan.on?"ON":"OFF"} label='Exhaust Fan'  automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.growLight.toggle} on="ON" off="OFF" onOff={state.switch_state.growLight.on?"ON":"OFF"} label='Grow Light'  automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.airPump.toggle} on="ON" off="OFF" onOff={state.switch_state.airPump.on?"ON":"OFF"} label='Air Pump'  automaticControl={valuename} />
        <RenderDeviceSwitch toggle={props.switchControl.waterPump.toggle} on="ON" off="OFF" onOff={state.switch_state.waterPump.on?"ON":"OFF"} label='Water Pump'  automaticControl={valuename} />

    </tbody></Table>
    return (ret)
}

export default RenderSwitchPanel;
