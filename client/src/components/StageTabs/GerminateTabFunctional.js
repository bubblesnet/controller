import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Stack, Text, Box, RangeSelector, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'

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

    let ret =
            <>
                <div className="global_container_">
                    <Table id="stages-tab" >
                        <tbody>
                        <TableRow>
                            <RenderLightSelector />
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box gap="small" pad="xlarge">
                                    {label ? <Text>{label}</Text> : null}
                                    <Stack>
                                        <Box background="light-4" height="6px" direction="row" />
                                        <RangeSelector
                                            direction="horizontal"
                                            min={RANGE_MIN}
                                            max={RANGE_MAX}
                                            step={1}
                                            values={range}
                                            onChange={nextRange => {
                                                setRange(nextRange);
                                            }}
                                        />
                                    </Stack>
                                    <Box align="center">
                                        <Text size="small">{`${range[0]}% - ${range[1]}%`}</Text>
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>

            </>
    return (ret)
}

export default RenderGerminateTab;
