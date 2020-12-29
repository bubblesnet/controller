import React, { useState } from 'react';
import { Grid,Image, Grommet, Box, RangeInput, Stack, Text } from 'grommet';
import humidity from '../../images/humidityicon.png'
import './stagesTab.css';
import '../../Palette.css';



function RenderHumiditySelector(props) {
    function setValue(value) {
        let x = JSON.parse(JSON.stringify(local_state));
        x.automation_settings.target_humidity = value
        props.setStateFromChild(x)
        setState(JSON.parse(JSON.stringify(x)))
    }

    const [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));

    const onChange = event => setValue(event.target.value);
    const min = props.state.automation_settings.humidity_min;
    const max = props.state.automation_settings.humidity_max;
    const units = props.state.display_settings.humidity_units;

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
                            value={local_state.automation_settings.target_humidity}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {local_state.automation_settings.target_humidity}{units}
                </Box>
            </Grid>
   );
}
export default RenderHumiditySelector;