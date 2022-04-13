import React from 'react';

import log from 'roarr';
import '../logimplementation'

// copyright and license inspection - no issues 4/13/22

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