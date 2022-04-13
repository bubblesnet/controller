import React from 'react';
import RenderUnauthenticatedOverview from "./components/UnauthenticatedOverviewFunctional";
import UnauthenticatedHeader from "./components/UnauthenticatedHeader";

// copyright and license inspection - no issues 4/13/22


function UnauthenticatedApp(props) {
    return (
        <>
        <UnauthenticatedHeader data-testid="animated-gif-container" nodeEnv={process.env.REACT_APP_NODE_ENV}/>
        <RenderUnauthenticatedOverview nodeEnv={process.env.REACT_APP_NODE_ENV} processLoginResult={props.processLoginResult}/>
        </>
    )
}


export default UnauthenticatedApp
