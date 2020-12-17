import React, { useState } from 'react';
import { render } from 'react-dom';

import { Grid,Image, Grommet, Box, RangeInput, Stack, Text } from 'grommet';
import {grommet} from 'grommet/themes'
import { ThemeType } from 'grommet/themes';
import thermometer from '../../images/thermometer-icon.png'
import './stagesTab.css';
import '../../Palette.css';


function RenderTemperatureSelector(props) {
    function setValue(value) {
        let x = state;
        x.automation_settings.target_temperature=value;
        props.setStateFromChild(state)
        setState(x)
    }

    const [state, setState] = useState(JSON.parse(JSON.stringify(props.state)));

    const onChange = event => setValue(event.target.value);
    const min = state.automation_settings.temperature_min;
    const max = state.automation_settings.temperature_max;
    const units = state.display_settings.temperature_units;

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
                    <Image src={thermometer} />
                </Box>
                <Box gridArea="min" justify={"center"}>{min}{units}</Box>
                <Box gridArea="slider"  justify={"center"} align-content={'center'}>
                        <RangeInput
                            direction="horizontal"
                            min={state.automation_settings.temperature_min}
                            max={state.automation_settings.temperature_max}
                            step={1}
                            value={state.automation_settings.target_temperature}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {state.automation_settings.target_temperature}{state.display_settings.temperature_units}
                </Box>
            </Grid>
   );
}
export default RenderTemperatureSelector;