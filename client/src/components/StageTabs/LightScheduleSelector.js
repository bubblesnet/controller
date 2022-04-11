import {Box, Grid, Select, TextInput} from "grommet";
import React, {useState} from "react";

import lighting_schedule_options from "../../options_lighting_schedule.json"
import light_type_options from "../../options_light_type.json"

function RenderLightSelector (props) {

    let options = [
    {name: "24 on", hours: 24},
    {name: "18 on/6 off", hours: 18},
    {name: "14 on/10 off", hours: 14},
    {name:  "12 on/12 off", hours: 12},
    {name:  "10 on/14 off", hours: 10},
    {name:  "6 on/18 off", hours: 6},
    {name:  "24 off", hours: 0}]

    function setLightTypeValue(value) {
        let x = props.automation_setting;
        x.current_light_type = value;
        props.setAutomationSettingFromChild(x)
//        setStation(JSON.parse(JSON.stringify(x)))
    }

    function setLightScheduleValue(value) {
        let x = props.automation_setting;
        x.current_lighting_schedule = value;
        for( let i = 0; i < options.length; i++ ) {
            if( options[i].name === value ) {
                x.hours_of_light = options[i].hours;
                break;
            }
        }
        props.setAutomationSettingFromChild(x)
//       setStation(JSON.parse(JSON.stringify(x)))
    }

    function setLightOnHourValue(value) {
        let x = props.automation_setting;
        x.light_on_start_hour = value;
        props.setAutomationSettingFromChild(x)
//        setStation(JSON.parse(JSON.stringify(x)))
    }

    function setHoursOfLightValue(value) {
        let x = props.automation_setting;
        x.hours_of_light = value;
        props.setAutomationSettingFromChild(x)
//        setStation(JSON.parse(JSON.stringify(x)))
    }

    const changeLightType = event => setLightTypeValue(event.target.value);
    const changeHoursOfLight = event => setHoursOfLightValue(event.target.value);
    const changeLightSchedule = event => setLightScheduleValue(event.target.value);
    const changeLightOnHour = event => setLightOnHourValue(event.target.value);

    console.log("automation_setting = " + JSON.stringify(props.automation_setting))
    let ret = <>
        <Grid
            round={'xxsmall'}
            direction={'horizontal'}
            fill
            areas={[
                {name: 'type', start: [0, 0], end: [0, 0]},
                {name: 'schedule', start: [1, 0], end: [1, 0]},
                {name: 'hours', start: [2, 0], end: [2, 0]},
                {name: 'start', start: [3, 0], end: [3, 0]},
            ]}
            columns={['200px', '200px', '200px', '200px']}
            rows={['60px']}
            gap="xxsmall"
        >

            <Box width={'small'} round={'small'} gridArea="type">
                Light Type
                <Select options={light_type_options} value={props.automation_setting.current_light_type}
                        onChange={changeLightType}/>
            </Box>
            <Box width={'small'} round={'xsmall'} gridArea="schedule">
                Light Schedule
                <Select options={lighting_schedule_options}
                        value={props.automation_setting.current_lighting_schedule}
                        onChange={changeLightSchedule}/>
            </Box>
            <Box width={'small'} round={'small'} gridArea="hours">
                Hours of Light
                <TextInput value={props.automation_setting.hours_of_light}
                           onChange={changeHoursOfLight}/>
            </Box>
            <Box width={'small'} round={'small'} gridArea="start">
                Light Start Hour
                <TextInput value={props.automation_setting.light_on_start_hour}
                        onChange={changeLightOnHour}/>
            </Box>

        </Grid>
    </>
    return (ret);
}

export default RenderLightSelector;

