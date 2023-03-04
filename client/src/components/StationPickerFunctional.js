/*
 * Copyright (c) John Rodley 2023.
 * SPDX-FileCopyrightText:  John Rodley 2023.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from "react";
import {Text,Select} from "grommet"
import RenderStageSelector2 from "./StageTabs/StageSelector2";

function RenderStationPickerFunctional(props) {

    console.log("RenderStationPickerFunctional index = " +props.stationindex )
    console.log( " station_name="+props.site.stations[props.stationindex].station_name)
    let stationNames = []

    function setSelectedStage(val) {

    }

    for( let i = 0; i < props.site.stations.length; i++ ) {
        stationNames.push(props.site.stations[i].station_name)
    }

        return (
        <div >
            <Text>Station</Text>
            <Select options={stationNames} value={props.site.stations[props.stationindex].station_name} onChange={({ option }) => props.changeStationFromChild(option)}/>
            <RenderStageSelector2 station={props.site.stations[props.stationindex]}
                                 display_settings={props.display_settings}
                                 setSelectedStageFromChild={setSelectedStage}
                                  station_type={props.site.stations[props.stationindex].station_type}
                                 automation_setting={{stage_name: props.site.stations[props.stationindex].current_stage}}
            />

            <Text >Crop Week {props.CropWeek} </Text>
        </div>)

}

export default RenderStationPickerFunctional;