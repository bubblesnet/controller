import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Stack, Text, Box, RangeSelector, Table, TableRow, TableCell, Select, RadioButton, Grid} from 'grommet'
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
    let ret =
            <>
                <div className="global_container_" >
                    <Grid id={'stages-tab'}
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
                        rows={['50px','xsmall','130px','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'stage'}  justify={'center'} border={{size:'medium'}} background={'white'}>
                            <RenderStageSelector />
                        </Box>
                        <Box gridArea={'light'}  border={{size:'medium'}} >
                            <RenderLightSelector />
                        </Box>
                        <Box gridArea={'temp'}  border={{size:'medium'}} >
                            <RenderTemperatureSelector label={"Target Temperature"}/>
                        </Box>
                        <Box gridArea={'humidity'}  border={{size:'medium'}} >
                            <RenderHumiditySelector label={"Target Humidity"}/>
                        </Box>
                        <Box gridArea={'actions'}   >
                            <RenderFormActions />
                        </Box>
                    </Grid>
                </div>

            </>
    return (ret)
}

export default RenderStageTab;
