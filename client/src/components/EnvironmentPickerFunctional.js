import React from "react";
import {RadioButtonGroup} from "rendition";
// import {ReadyState} from "react-use-websocket";

function RenderEnvironmentPickerFunctional(props) {

    let setNodeEnv = (value) => {
        console.log("EnvironmentPicker set nodeEnv to " + value)
        props.handleClick( value )
    }

        return (
        <div>
            <RadioButtonGroup
                padding="10px"
                className="RenderEnvironmentPickerFunctional"
                name="environment"
                direction="row-responsive"
                options={['DEV', 'TEST', 'PRODUCTION']}
                value={props.nodeEnv} onChange={(event) => setNodeEnv(event.target.value)}
            />
        </div>)

}

export default RenderEnvironmentPickerFunctional;