import React, {useEffect, useState} from 'react';
import {Table,TableRow} from 'grommet';
import '../../App.css';
import {TableCell} from "grommet";

function RenderStatus (props) {
    let initValues = {
        stage: "Vegetative",
        lightSchedule: "12/12",
        lastWaterChange: "10 days ago",
        powerConsumption: "40W",
        cabinetDoor: "Closed",
        outerDoor: "Closed",
        lastTraining: "17 days ago",
        lastFilterChange: "never",
        currentStageStarted: "25 days ago",
        nextStageStarts: "10 days",
        airTempTop: "84F",
        airTempMiddle: "81F",
        airTempBottom: "79F",
        waterTemp: "70F",
        plantHeight: "37in"
    };

    let [values, setValues] = useState(initValues); //

    useEffect(() => {
        console.log("RenderStatus useEffect growLightOn = " + values.growLightOn)
        const timer = setTimeout(() => setValues(initValues, 4000));
        return () => clearTimeout(timer);
    }, [values]);

    let ret =
                <div id="current-status-holder">
                    <Table>
                        <TableRow><TableCell>Stage</TableCell><TableCell>{values.stage}</TableCell></TableRow>
                        <TableRow><TableCell>Light Schedule</TableCell><TableCell>{values.lightSchedule}</TableCell></TableRow>
                        <TableRow><TableCell>Last Water Change</TableCell><TableCell>{values.lastWaterChange}</TableCell></TableRow>
                        <TableRow><TableCell>Power Consumption</TableCell><TableCell>{values.powerConsumption}</TableCell></TableRow>
                        <TableRow><TableCell>Cabinet Door</TableCell><TableCell>{values.cabinetDoor}</TableCell></TableRow>
                        <TableRow><TableCell>Outer Door</TableCell><TableCell>{values.outerDoor}</TableCell></TableRow>
                        <TableRow><TableCell>Last Training</TableCell><TableCell>{values.lastTraining}</TableCell></TableRow>
                        <TableRow><TableCell>Last Filter Change</TableCell><TableCell>{values.lastFilterChange}</TableCell></TableRow>
                        <TableRow><TableCell>Current Stage Started</TableCell><TableCell>{values.currentStageStarted}</TableCell></TableRow>
                        <TableRow><TableCell>Next Stage Starts</TableCell><TableCell>{values.nextStageStarts}</TableCell></TableRow>
                        <TableRow><TableCell>Air Temp Top</TableCell><TableCell>{values.airTempTop}</TableCell></TableRow>
                        <TableRow><TableCell>Air Temp Middle</TableCell><TableCell>{values.airTempMiddle}</TableCell></TableRow>
                        <TableRow><TableCell>Air Temp Bottom</TableCell><TableCell>{values.airTempBottom}</TableCell></TableRow>
                        <TableRow><TableCell>Water Temp</TableCell><TableCell>{values.waterTemp}</TableCell></TableRow>
                        <TableRow><TableCell>Plant Height</TableCell><TableCell>{values.plantHeight}</TableCell></TableRow>
                    </Table>
                </div>
    return (ret)
}

export default RenderStatus;



