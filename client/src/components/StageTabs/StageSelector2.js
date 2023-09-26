/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
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

import {Text, Select} from "grommet";
import React, {useState} from "react";

import stage_options from "../../stage_options.json"

// copyright and license inspection - no issues 4/13/22

function RenderStageSelector2 (props) {
/*
    function setCurrentStageValue(option) {
        let x = local_station;
        console.log("current stage value " +x.current_stage + " new stage value " + option)
        x.current_stage = option
        props.setStateFromChild(JSON.parse(JSON.stringify(x)))
        setStation(x)
    }
*/
    let selected_stage_options = []
    for( let i = 0; i < stage_options.length; i++ ) {
        if( stage_options[i].station_type === props.station_type ) {
            selected_stage_options = stage_options[i].stages
        }
    }

    function setSelectedStageValue(option) {
        let x = local_station;
        console.log("selected stage value " +x.current_stage + " new stage value " + option)
        x.current_stage = option
        props.setSelectedStageFromChild(option)
        setStation(x)
    }

    const [local_station, setStation] = useState(JSON.parse(JSON.stringify(props.station)));

    console.log("rendering with value={"+props.automation_setting.stage_name+"}")
    let ret = <>
        <Text >Select Stage</Text>
        <Select options={selected_stage_options} value={props.automation_setting.stage_name}
                            onChange={({ option }) => setSelectedStageValue(option)} />
            </>
    return(ret);
}

export default RenderStageSelector2;

