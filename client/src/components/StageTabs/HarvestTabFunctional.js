import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './stagesTab.css'
import RenderLightSelector from './LightScheduleSelector'

function RenderHarvestTab (props) {

    console.log("RenderHarvestTab")
    let [values, setValues] = useState({
    }); //

    useEffect(() => {
        console.log("RenderHarvestTab useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [values]);

    let ret =
            <>
                <div className="global_container_">
                    <Table className="stages-tab" >
                        <tbody>
                        <TableRow>
                            <RenderLightSelector />
                        </TableRow>
                        </tbody>
                    </Table>
                </div>

            </>
    return (ret)
}

export default RenderHarvestTab;
