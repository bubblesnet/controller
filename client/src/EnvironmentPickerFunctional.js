import React from "react";
import {RadioButtonGroup,DropDownButton} from "rendition";

function RenderEnvironmentPickerFunctional(props) {

    let setDatabase = (value) => {
        console.log("EnvironmentPicker set database to " + value)
        props.handleClick( value )
    }

        return (
        <div >
            <RadioButtonGroup
                padding="10px"
                className="RenderEnvironmentPickerFunctional"
                name="environment"
                direction="row-responsive"
                options={['development', 'test', 'production']}
                value={props.database} onChange={(event) => setDatabase(event.target.value)}
            />
        </div>)

}

export default RenderEnvironmentPickerFunctional;