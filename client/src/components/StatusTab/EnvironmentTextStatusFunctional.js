import React, {useEffect, useState} from 'react';
import {Grid, Table, TableRow,TableCell} from 'grommet';
import '../../App.css';
import './statusTab.css'
import {Box} from "grommet";
import RenderEnvValueWithDirection from './EnvValueWithDirection'

function RenderStateTextStatus (props) {

    let [state, setState] = useState(props.state); //

    let ret =
        <Grid className={'status-table-holder'}
              round={'small'}
              direction={'vertical'}
              areas={[
                  { name: 'table-label', start: [0, 0], end: [2, 0] },
                  { name: 'external-air-temp-label', start: [0, 1], end: [0, 1] }, { name: 'external-air-temp-value', start: [1, 1], end: [1, 1] }, { name: 'external-air-temp-direction', start: [2, 1], end: [2, 1] },
                  { name: 'air-temp-top-label', start: [0, 2], end: [0, 2] }, { name: 'air-temp-top-value', start: [1, 2], end: [1, 2] }, { name: 'air-temp-top-direction', start: [2, 2], end: [2, 2] },
                  { name: 'air-temp-middle-label', start: [0, 3], end: [0, 3] }, { name: 'air-temp-middle-value', start: [1, 3], end: [1, 3] },{ name: 'air-temp-middle-direction', start: [2, 3], end: [2, 3] },
                  { name: 'air-temp-bottom-label', start: [0, 4], end: [0, 4] }, { name: 'air-temp-bottom-value', start: [1, 4], end: [1, 4] },{ name: 'air-temp-bottom-direction', start: [2, 4], end: [2, 4] },
                  { name: 'water-temp-label', start: [0, 5], end: [0, 5] }, { name: 'water-temp-value', start: [1, 5], end: [1, 5] },{ name: 'water-temp-direction', start: [2, 5], end: [2, 5] },
                  { name: 'root-ph-label', start: [0, 6], end: [0, 6] }, { name: 'root-ph-value', start: [1, 6], end: [1, 6] },{ name: 'root-ph-direction', start: [2, 6], end: [2, 6] },
                  { name: 'humidity-label', start: [0, 7], end: [0, 7] }, { name: 'humidity-value', start: [1, 7], end: [1, 7] },{ name: 'humidity-direction', start: [2, 7], end: [2, 7] },
                  { name: 'external-humidity-label', start: [0, 8], end: [0, 8] }, { name: 'external-humidity-value', start: [1, 8], end: [1, 8] },{ name: 'external-humidity-direction', start: [2, 8], end: [2, 8] },
              ]}
              columns={['small', 'xxsmall','small']}
              rows={['40px','20px','20px','20px','20px','20px','20px','20px','20px']}
              gap={"xxsmall"} >
            <Box gridArea={'table-label'}>Environment</Box>
            <RenderEnvValueWithDirection gridArea={'external-air-temp'} label='External Air Temp' value={state.status.temp_air_external} direction={state.status.temp_air_external_direction} />
            <RenderEnvValueWithDirection gridArea={'air-temp-top'} label='Air Temp Top' value={state.status.temp_air_top} units={state.display_settings.temperature_units} direction={state.status.temp_air_top_direction} />
            <RenderEnvValueWithDirection gridArea={'air-temp-middle'} label='Air Temp Middle' value={state.status.temp_air_middle} units={state.display_settings.temperature_units} direction={state.status.temp_air_middle_direction} />
            <RenderEnvValueWithDirection gridArea={'air-temp-bottom'} label='Air Temp Bottom' value={state.status.temp_air_bottom} units={state.display_settings.temperature_units} direction={state.status.temp_air_bottom_direction} />
            <RenderEnvValueWithDirection gridArea={'water-temp'} label='Water Temp' value={state.status.temp_water} units={state.display_settings.temperature_units} direction={state.status.temp_water_direction} />
            <RenderEnvValueWithDirection gridArea={'root-ph'} label='Root pH' value={state.status.root_ph} units={''} direction={state.status.root_ph_direction} />
            <RenderEnvValueWithDirection gridArea={'humidity'} label='Humidity' value={state.status.humidity_internal} units={state.display_settings.humidity_units} direction={state.status.humidity_internal_direction} />
            <RenderEnvValueWithDirection gridArea={'external-humidity'} label='External Humidity' value={state.status.humidity_external} units={state.display_settings.humidity_units} direction={state.status.humidity_external_direction} />
        </Grid>
    return (ret)
}

export default RenderStateTextStatus;



