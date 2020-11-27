import {Select, TableCell, TableRow} from "grommet";
import React from "react";
import RenderGerminateTab from "./GerminateTabFunctional";

function RenderLightSelector (props) {
    let ret = <>
        <TableCell>Light Schedule</TableCell>
        <TableCell><Select options={["24hr", "18/6", "14/10", "12/12"]}/></TableCell>
        </>
    return(ret);
}

export default RenderLightSelector;

