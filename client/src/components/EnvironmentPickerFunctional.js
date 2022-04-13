import React from "react";
import {RadioButtonGroup} from "rendition";
import log from "roarr";

// copyright and license inspection - no issues 4/13/22

function RenderEnvironmentPickerFunctional(props) {

    let setNodeEnv = (value) => {
        log.trace("EnvironmentPicker set nodeEnv to " + value)
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