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

function RenderTemperatureSelector({ initialValue = 75, label }) {
    const [value, setValue] = useState(initialValue);

    const onChange = event => setValue(event.target.value);
    const min = 60;
    const max = 90;
    const units = 'F';

    /*
            <Grommet theme={customThemeRangeInput}>
            <Grid rows={['small']} columns={['xsmall','large']} gap={'xsmall'}
                  areas={[{name: 'icon', start: [0,0], end: [0,1]},{name: 'slider', start:[1,0], end:[1,0]}]}>
            <Image style={{float: "left"}} height="16px" width="16px" src={thermometer} />
            <Box gridArea={'icon'} gap="small" pad="xlarge">
            {label ? <Text>{label}</Text> : null}
            <Box  gridArea={'slider'}>
            <Stack>
                <Box height="16px" direction="row" />
                <RangeInput
                    direction="horizontal"
                    min={RANGE_MIN}
                    max={RANGE_MAX}
                    step={1}
                    value={value}
                    onChange={onChange}
                />
            </Stack>
           <Box align="center">
                <Text size="small">{`${value}F%`}</Text>
            </Box>
            </Box>
            </Box>
             </Grid>
        </Grommet>

     */

    return (
        <Grommet theme={grommet} full>
            <Grid
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
                <Box gridArea="label" background={"var(--color-primary-0)"} align="center">
                    {label}
                </Box>

                <Box gridArea="icon" background={"var(--color-primary-0)"} justify={"center"}>
                    <Image src={thermometer} />
                </Box>
                <Box gridArea="min" background={"var(--color-primary-0)"} justify={"center"}>{min}{units}</Box>
                <Box gridArea="slider" background={"var(--color-primary-0)"} justify={"center"} align-content={'center'}>
                        <RangeInput
                            direction="horizontal"
                            min={RANGE_MIN}
                            max={RANGE_MAX}
                            step={1}
                            value={value}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" background={"var(--color-primary-0)"} justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" background={"var(--color-primary-0)"} justify={"center"} align="center">
                    {value}{units}
                </Box>
            </Grid>
        </Grommet>
    );
}
export default RenderTemperatureSelector;