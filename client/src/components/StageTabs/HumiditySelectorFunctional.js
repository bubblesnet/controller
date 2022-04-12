import React, { useState } from 'react';
import { Grid,Image, Box, RangeInput } from 'grommet';
import humidity from '../../images/humidityicon.png'
import './stagesTab.css';
import '../../Palette.css';
import log from "roarr";



function RenderHumiditySelector(props) {
    function setValue(value) {
        let x = JSON.parse(JSON.stringify(props.automation_setting));
        log.trace("RenderHumiditySelector = " + JSON.stringify(x))
        x.target_humidity = value
        props.setAutomationSettingFromChild(x)
    }

    const onChange = event => setValue(event.target.value);
    const min = props.automation_setting.humidity_min;
    const max = props.automation_setting.humidity_max;
    const units = props.display_settings.humidity_units
    const target_humidity = props.automation_setting.target_humidity
    log.trace("RenderHumiditySelector 1 = " + JSON.stringify(props.automation_setting))

    return (
            <Grid
                round={'xxsmall'}
                fill
                areas={[
                    { name: 'label', start: [0, 0], end: [3, 0] },
                    { name: 'icon', start: [0, 1], end: [0, 1] },
                    { name: 'min', start: [1, 1], end: [1, 1] },
                    { name: 'slider', start: [2, 1], end: [2, 1] },
                    { name: 'max', start: [3, 1], end: [3, 1] },
                    { name: 'value', start: [0, 2], end: [3, 2] },
                ]}
                columns={['16px', '30px', '400px', '30px']}
                rows={['28px','60px', '28px']}
                gap="xxsmall"
            >
                <Box gridArea="label" color={'yellow'}  align="center">
                    {props.label}
                </Box>

                <Box gridArea="icon"  justify={"center"}>
                    <Image src={humidity} />
                </Box>
                <Box gridArea="min" justify={"center"}>{min}{units}</Box>
                <Box gridArea="slider"  justify={"center"} align-content={'center'}>
                        <RangeInput
                            direction="horizontal"
                            min={min}
                            max={max}
                            step={1}
                            value={target_humidity}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {target_humidity}{units}
                </Box>
            </Grid>
   );
}
export default RenderHumiditySelector;