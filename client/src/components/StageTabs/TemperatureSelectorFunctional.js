import React, { useState } from 'react';

import { Grid,Image, Box, RangeInput } from 'grommet';
import thermometer from '../../images/thermometer-icon.png'
import './stagesTab.css';
import '../../Palette.css';


function RenderTemperatureSelector(props) {
    function setValue(value) {
        let x = local_state;
        x.automation_settings.target_temperature=value;
        props.setStateFromChild(local_state)
        setState(x)
    }

    const [local_state, setState] = useState(JSON.parse(JSON.stringify(props.state)));
    const [local_settings, setSettings] = useState(JSON.parse(JSON.stringify(props.settings)));

    const onChange = event => setValue(event.target.value);
    const min = local_state.automation_settings.temperature_min;
    const max = local_state.automation_settings.temperature_max;
    const units = local_settings.display_settings.temperature_units;

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
                            min={min}
                            max={max}
                            step={1}
                            value={local_state.automation_settings.target_temperature}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {local_state.automation_settings.target_temperature}{units}
                </Box>
            </Grid>
   );
}
export default RenderTemperatureSelector;