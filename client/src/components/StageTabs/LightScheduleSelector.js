import {Box, Grid, Select, TextInput} from "grommet";
import React, {useState} from "react";

import lighting_schedule_options from "../../options_lighting_schedule.json"
import light_type_options from "../../options_light_type.json"

function RenderLightSelector (props) {

    function setLightTypeValue(value) {
        let x = local_station;
        x.automation_settings.current_light_type = value;
        props.setStateFromChild(x)
        setStation(JSON.parse(JSON.stringify(x)))
    }

    function setLightScheduleValue(value) {
        let x = local_station;
        x.automation_settings.current_lighting_schedule = value;
        props.setStateFromChild(x)
        setStation(JSON.parse(JSON.stringify(x)))
    }

    function setLightOnHourValue(value) {
        let x = local_station;
        x.automation_settings.light_on_start_hour = value;
        props.setStateFromChild(x)
        setStation(JSON.parse(JSON.stringify(x)))
    }

    const [local_station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));

    const changeLightType = event => setLightTypeValue(event.target.value);
    const changeLightSchedule = event => setLightScheduleValue(event.target.value);
    const changeLightOnHour = event => setLightOnHourValue(event.target.value);

//    console.log("automation_settings = " + JSON.stringify(local_station.automation_settings))
    let ret = <>
        <Grid
            round={'xxsmall'}
            direction={'horizontal'}
            fill
            areas={[
                {name: 'type', start: [0, 0], end: [0, 0]},
                {name: 'schedule', start: [1, 0], end: [1, 0]},
                {name: 'start', start: [2, 0], end: [2, 0]},
            ]}
            columns={['240px', '240px', '240px']}
            rows={['60px']}
            gap="xxsmall"
        >

            <Box width={'small'} round={'xsmall'}>
                Light Schedule
                <Select options={lighting_schedule_options}
                        value={local_station.automation_settings.current_lighting_schedule}
                        onChange={changeLightSchedule}/>
            </Box>
            <Box width={'small'} round={'small'}>
                Light Type
                <Select options={light_type_options} value={local_station.automation_settings.current_light_type}
                        onChange={changeLightType}/>
            </Box>
            <Box width={'small'} round={'small'}>
                Light Start Hour
                <TextInput value={local_station.automation_settings.light_on_start_hour}
                        onChange={changeLightOnHour}/>
            </Box>

        </Grid>
    </>
    return (ret);
}

export default RenderLightSelector;

