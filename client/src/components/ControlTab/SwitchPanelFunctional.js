import React, { useState} from "react";
import {Table, TableCell, TableRow} from "grommet";
import RenderDeviceSwitch from "./DeviceSwitchFunctional";
import Switch from "react-input-switch";

function RenderSwitchPanel (props) {
    let [switchControl, setSwitchControl] = useState(props.switchControl)
    let [automaticControlOn, setAutomaticControlOn] = useState(props.switchControl.automaticControl.on)


    function toggleHumidifier(e) {
        console.log("1a thestate toggleHumidifier from " + props.switchControl.humidifier.on)
        props.switchControl.humidifier.toggle(e)
    }

    function toggleHeater(e) {
        console.log("1a thestate toggleHeater from " + props.switchControl.heater.on)
        props.switchControl.heater.toggle(e)
    }

    function toggleAutomatic(e) {
        switchControl.automaticControl.on = !switchControl.automaticControl.on;
        setSwitchControl(switchControl)
        switchControl.automaticControl.toggle(e)
        setAutomaticControlOn(!automaticControlOn)
    }

    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'
    let valuename = 'ON'
    console.log("11 thestate RenderSwitchPanel switch_state.heater = " + props.state.switch_state.heater.on + " switchControl.heater " + props.switchControl.heater.on)
    if(!automaticControlOn)
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

        <RenderDeviceSwitch exists={props.state.cabinet_settings.humidifier} toggle={toggleHumidifier} on="ON" off="OFF" onOff={props.state.switch_state.humidifier.on?"ON":"OFF"} label='Humidifier' automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.heater} toggle={toggleHeater} on="ON" off="OFF" onOff={props.state.switch_state.heater.on?"ON":"OFF"} label='Heater' automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.intake_fan} toggle={props.switchControl.intakeFan.toggle} on="ON" off="OFF" onOff={props.state.switch_state.intakeFan.on?"ON":"OFF"} label='Intake Fan'  automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.exhaust_fan} toggle={props.switchControl.exhaustFan.toggle} on="ON" off="OFF" onOff={props.state.switch_state.exhaustFan.on?"ON":"OFF"} label='Exhaust Fan'  automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.light_vegetative||props.state.cabinet_settings.light_bloom||props.state.cabinet_settings.light_germinate}
                            toggle={props.switchControl.currentGrowLight.toggle} on="ON" off="OFF" onOff={props.state.switch_state.currentGrowLight.on?"ON":"OFF"} label='Current Grow Light' automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.air_pump} toggle={props.switchControl.airPump.toggle} on="ON" off="OFF" onOff={props.state.switch_state.airPump.on?"ON":"OFF"} label='Air Pump'  automaticControl={valuename} />
        <RenderDeviceSwitch exists={props.state.cabinet_settings.water_pump} toggle={props.switchControl.waterPump.toggle} on="ON" off="OFF" onOff={props.state.switch_state.waterPump.on?"ON":"OFF"} label='Water Pump'  automaticControl={valuename} />

    </tbody></Table>
    return (ret)
}

export default RenderSwitchPanel;
