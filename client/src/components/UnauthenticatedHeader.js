import React, {useState} from 'react';

function UnauthenticatedHeader (props) {
    console.log("BubblesApp render props = " + JSON.stringify(props))

    return (
        <div>
            <header className="BubblesApp-header" style={{'width': '100%'}} >
                <span style={{
                    'width': '25%',
                    'alignItems': 'flex-start',
                    'marginLeft': '25px'
                }}>Bubbles</span>
                <span style={{'width': '75%'}} >
                    <div id="animated-gif-container" />
                </span>
            </header>
        </div>
   );
}

export default UnauthenticatedHeader