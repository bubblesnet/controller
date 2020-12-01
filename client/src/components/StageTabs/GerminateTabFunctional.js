import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Stack, Text, Box, RangeSelector, Table, TableRow, TableCell, Select, RadioButton, Grid} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderTemperatureSelector from './TemperatureSelectorFunctional'
import RenderHumiditySelector from './HumiditySelectorFunctional'

function RenderGerminateTab (props) {

    console.log("RenderGerminateTab")
    const initialRange = [77, 81]
    const [range, setRange] = useState(initialRange);
    const RANGE_MIN = 60;
    const RANGE_MAX =90;

    const label = 'Target Temperature Range'
    useEffect(() => {
        console.log("RenderGerminateTab useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [range]);
/*
                    <Table id="stages-tab" >
                        <tbody>
                        <TableRow>
                            <RenderLightSelector />
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <RenderTemperatureSelector label={"Target Temperature"}/>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>

 */
    let ret =
            <>
                <div className="global_container_" >
                    <Grid id={'stages-tab'}
                          justify={'center'}
                        round={'small'}
                        direction={'vertical'}
                        fill
                        areas={[
                            { name: 'light', start: [0, 0], end: [0, 0] },
                            { name: 'temp', start: [0, 1], end: [0, 1] },
                            { name: 'humidity', start: [0, 2], end: [0, 2] },
                        ]}
                        columns={['large']}
                        rows={['xsmall','130px','130px']}
                        gap={"xxsmall"}
                    >
                        <Box gridArea={'light'}  border={{size:'medium'}} background={'white'}>
                            <RenderLightSelector />
                        </Box>
                        <Box gridArea={'temp'}  border={{size:'medium'}} background={'white'}>
                            <RenderTemperatureSelector label={"Target Temperature"}/>
                        </Box>
                        <Box gridArea={'humidity'}  border={{size:'medium'}} background={'white'}>
                            <RenderHumiditySelector label={"Target Humidity"}/>
                        </Box>
                    </Grid>
                </div>

            </>
    return (ret)
}

export default RenderGerminateTab;
