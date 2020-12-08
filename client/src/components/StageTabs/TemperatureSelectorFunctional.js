import React, { useState } from 'react';
import { render } from 'react-dom';

import { Grid,Image, Grommet, Box, RangeInput, Stack, Text } from 'grommet';
import {grommet} from 'grommet/themes'
import { ThemeType } from 'grommet/themes';
import thermometer from '../../images/thermometer-icon.png'
import './stagesTab.css';
import '../../Palette.css';


const RANGE_MIN = 60;
const RANGE_MAX = 90;

const customThemeRangeInput = {
    global: {
        spacing: '12px',
    },
    rangeInput: {
        track: {
            color: 'accent-2',
            height: '12px',
            extend: () => `border-radius: 10px`,
            lower: {
                color: 'brand',
                opacity: 0.7,
            },
            upper: {
                color: 'dark-4',
                opacity: 0.3,
            },
        },
        thumb: {
            color: 'neutral-2',
        },
    },
};

function RenderTemperatureSelector(props) {
    const [value, setValue] = useState(props.automation_settings.target_temperature);

    const onChange = event => setValue(event.target.value);
    const min = props.automation_settings.temperature_min;
    const max = props.automation_settings.temperature_max;
    const units = props.automation_settings.target_temperature_units;

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
                            min={props.automation_settings.temperature_min}
                            max={props.automation_settings.temperature_max}
                            step={1}
                            value={value}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {value}{units}
                </Box>
            </Grid>
   );
}
export default RenderTemperatureSelector;