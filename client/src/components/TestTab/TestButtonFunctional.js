import React, {useEffect, useState} from 'react';
import '../../App.css';
import {Button, TableCell} from 'grommet'
import Switch from "react-input-switch";

function RenderTestButton (props) {
    const [on,setOn] = useState(true);

    function onChange() {
        setOn(!on)
        props.onChange();
    }
    const onstr = 'ON'
    const offstr = 'OFF'
    let onOff = "blah"
    if(on) {
        onOff = onstr
    } else {
        onOff = offstr
    }
    let ret =
        <>
            <p>RenderTestButton</p>
            <Switch on={onstr} off={offstr} value={onOff} onChange={onChange} />
            <p>RenderTestButton</p>
        </>
    return (ret);
}

export default RenderTestButton
