import React from 'react';

import log from 'roarr';
import '../logimplementation'

function RenderSiteStationMenu(props) {

    if( typeof props.site === 'undefined') {
        props.site = {}
    }
    if( typeof props.site.stations === 'undefined') {
        props.site.stations = []
    }
    log.trace("RenderSiteStationMenu props.site = "+JSON.stringify(props.site))
    return (
        <></>
    );
}


export default RenderSiteStationMenu;