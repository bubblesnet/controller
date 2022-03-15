import React from "react";
import {Table, TableCell, TableRow} from "grommet";
import RenderDeviceSwitch from "./DeviceSwitchFunctional";
import Switch from "react-input-switch";

var slideclick_valid = new Audio("slideclick_valid.mp3");

function goodbeep() {
    slideclick_valid.play()
}

function RenderSwitchPanel (props) {
    let automaticControlOn = props.switchControl.automaticControl.on
    let value_name = 'ON'
    let trackBackgroundColor = 'red'
    let trackCheckedColor = 'green'
    let buttonBackgroundColor = 'yellow'
    let buttonCheckedColor = 'yellow'
    let toggle_style = {
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
    }

    function toggleHumidifier(e) {
        props.switchControl.humidifier.toggle(e)
    }

    function toggleHeater(e) {
        props.switchControl.heater.toggle(e)
    }

    function toggleAutomatic(e) {
        goodbeep()
        props.switchControl.automaticControl.toggle(e)
    }

    if(!automaticControlOn)
        value_name = 'OFF'


    let ret =
            <Table ><tbody>
        <TableRow ><TableCell >Automatic Control</TableCell><TableCell>
            <Switch onChange={toggleAutomatic} on="ON" off="OFF" value={value_name}
            styles={toggle_style} />
            </TableCell></TableRow>

        <RenderDeviceSwitch exists={props.state.station_settings.humidifier} toggle={toggleHumidifier} on="ON" off="OFF" onOff={props.state.switch_state.humidifier.on?"ON":"OFF"} label='Humidifier' automaticControl={value_name} changing={props.state.switch_state.humidifier.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.heater} toggle={toggleHeater} on="ON" off="OFF" onOff={props.state.switch_state.heater.on?"ON":"OFF"} label='Heater' automaticControl={value_name} changing={props.state.switch_state.heater.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.intake_fan} toggle={props.switchControl.intakeFan.toggle} on="ON" off="OFF" onOff={props.state.switch_state.intakeFan.on?"ON":"OFF"} label='Intake Fan'  automaticControl={value_name} changing={props.state.switch_state.intakeFan.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.exhaust_fan} toggle={props.switchControl.exhaustFan.toggle} on="ON" off="OFF" onOff={props.state.switch_state.exhaustFan.on?"ON":"OFF"} label='Exhaust Fan'  automaticControl={value_name} changing={props.state.switch_state.exhaustFan.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.air_pump} toggle={props.switchControl.airPump.toggle} on="ON" off="OFF" onOff={props.state.switch_state.airPump.on?"ON":"OFF"} label='Air Pump'  automaticControl={value_name} changing={props.state.switch_state.airPump.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.water_pump} toggle={props.switchControl.waterPump.toggle} on="ON" off="OFF" onOff={props.state.switch_state.waterPump.on?"ON":"OFF"} label='Water Pump'  automaticControl={value_name} changing={props.state.switch_state.waterPump.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.light_bloom} toggle={props.switchControl.lightBloom.toggle} on="ON" off="OFF" onOff={props.state.switch_state.lightBloom.on?"ON":"OFF"} label='Growlight'  automaticControl={value_name} changing={props.state.switch_state.lightBloom.changing}/>
        <RenderDeviceSwitch exists={props.state.station_settings.water_heater} toggle={props.switchControl.waterHeater.toggle} on="ON" off="OFF" onOff={props.state.switch_state.waterHeater.on?"ON":"OFF"} label='Water Heater'  automaticControl={value_name} changing={props.state.switch_state.waterHeater.changing}/>

    </tbody></Table>
    return (ret)
}

export default RenderSwitchPanel;
