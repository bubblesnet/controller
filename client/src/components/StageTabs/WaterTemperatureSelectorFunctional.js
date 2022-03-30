import React, { useState } from 'react';

import { Grid,Image, Box, RangeInput } from 'grommet';
import thermometer from '../../images/thermometer-icon.png'
import './stagesTab.css';
import '../../Palette.css';


function RenderWaterTemperatureSelector(props) {
    function setValue(value) {
        let x = local_station;
        x.automation_settings.target_temperature=value;
        props.setStateFromChild(local_station)
        setStation(x)
    }

    const [local_station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));


    const onChange = event => setValue(event.target.value);
    const units = props.display_settings.temperature_units;
    const min = props.station.automation_settings.temperature_min;
    const max = props.station.automation_settings.temperature_max;

    const target_temperature = local_station.automation_settings.target_temperature

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
                            value={target_temperature}
                            onChange={onChange}
                        />
                </Box>
                <Box gridArea="max" justify={"center"}>{max}{units}</Box>
                <Box gridArea="value" justify={"center"} align="center">
                    {target_temperature}{units}
                </Box>
            </Grid>
   );
}
export default RenderWaterTemperatureSelector;