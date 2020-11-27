import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Stack, Text, Box, RangeSelector, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'
import RenderTemperatureSelector from './TemperatureSelectorFunctional'

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
                                <RenderTemperatureSelector label={"Target Temperature"}/>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>

            </>
    return (ret)
}

export default RenderGerminateTab;
