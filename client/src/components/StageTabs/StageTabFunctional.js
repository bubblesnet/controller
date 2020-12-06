import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, Stack, Text, Box, RangeSelector, Table, TableRow, TableCell, Select, RadioButton, Grid} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderTemperatureSelector from './TemperatureSelectorFunctional'
import RenderHumiditySelector from './HumiditySelectorFunctional'
import RenderStageSelector from './StageSelector'
import RenderFormActions from '../FormActions'


function RenderStageTab (props) {

    console.log("RenderGerminateTab")
    const initialRange = [77, 81]
    const [range, setRange] = useState(initialRange);
    const RANGE_MIN = 60;
    const RANGE_MAX =90;

    const label = 'Target Temperature Range'
    useEffect(() => {
        console.log("RenderGerminateTab useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [range]);
    let [themex, setThemex] = useState(props.theme ); //

    let ret =
            <Grommet theme={themex}>
                <div className="global_container_" >
                    <Grid className={'centered-thead-text'} id={'stages-tab'}
                          justify={'center'}
                        round={'small'}
                        direction={'vertical'}
                        fill
                        areas={[
                            { name: 'stage', start: [0, 0], end: [0, 0] },
                            { name: 'light', start: [0, 1], end: [0, 1] },
                            { name: 'temp', start: [0, 2], end: [0, 2] },
                            { name: 'humidity', start: [0, 3], end: [0, 3] },
                            { name: 'actions', start: [0, 4], end: [0, 4] },
                        ]}
                        columns={['large']}
                        rows={['60px','xsmall','130px','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'stage'} >
                            <RenderStageSelector />
                        </Box>
                        <Box gridArea={'light'}  >
                            <RenderLightSelector />
                        </Box>
                        <Box gridArea={'temp'} >
                            <RenderTemperatureSelector label={"Target Temperature"}/>
                        </Box>
                        <Box gridArea={'humidity'} >
                            <RenderHumiditySelector label={"Target Humidity"}/>
                        </Box>
                        <Box gridArea={'actions'}   >
                            <RenderFormActions />
                        </Box>
                    </Grid>
                </div>

            </Grommet>
    return (ret)
}

export default RenderStageTab;
