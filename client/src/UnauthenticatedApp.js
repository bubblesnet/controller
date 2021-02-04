import React from 'react';
import RenderUnauthenticatedOverview from "./components/UnauthenticatedOverviewFunctional";
import UnauthenticatedHeader from "./components/UnauthenticatedHeader";


function UnauthenticatedApp(props) {
    return (
        <>
        <UnauthenticatedHeader data-testid="animated-gif-container" nodeEnv='development'/>
        <RenderUnauthenticatedOverview nodeEnv='development' apiPort='0' processLoginResult={props.processLoginResult}/>
        </>
    )
}


export default UnauthenticatedApp
