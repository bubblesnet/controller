import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//import TreeItem from '@material-ui/lab/TreeItem';
// import RenderDeviceMapTab from "./DeviceMapTab/DeviceMapTabFunctional";

import Tree from '@naisutech/react-tree'

import log from 'roarr';
import '../logimplementation'

function RenderSiteStationMenu(props) {
    const useStyles = makeStyles({
        root: {
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
        },
    });

    function setCurrentStation(ev) {
        let x = ev.target.nodeId
        log.trace("ev.target "+ev.target.nodeId)
        if( props.currentStationIndex === 1 ) {
            props.setCurrentStationIndex(1)
        } {
            props.setCurrentStationIndex(0)
        }
//        alert("setCurrentStationIndex " + x)
    }

    const myTheme = {
        'my-theme': {
            text: '#fff',
            bg: '#477CBC',
            highlight: 'blue', // the colours used for selected and hover items
            decal: 'hotpink', // the colours used  for open folder indicators and icons
            accent: '#999' // the colour used for row borders and empty file indicators
        }
    }

    function getStation( station, index, arr ) {
//        log.info("ssm: getStation = " + station.stationid)
        if (typeof station.stationid === 'undefined') {
            return <></>
        }
        let y = String(1000 + station.stationid)
        log.debug("ssm: nodeId = " + y)
        let items = []
        for (let i = 0; i < props.site.stations.length; i++) {
            let item = {
                id: 990000 + i,
                parentId: 87654321,
                label: props.site.stations[i].name
            }
            items.push(item)
        }
        return([{id: 87654321, label: "site 1", nodes: items}])
//       return <TreeItem nodeId={y} label={station.station_name} onLabelClick={setCurrentStation}/>
    }

    const classes = useStyles();
    if( typeof props.site === 'undefined') {
        props.site = {}
    }
    if( typeof props.site.stations === 'undefined') {
        props.site.stations = []
    }
//    let stations = props.site.stations.map(getStation)
    let stations = getStation(props.site.stations[0], 0)
    console.log("stations = " + JSON.stringify(stations[0]))
    const onSelect = selectedNode => {
        // do something with selected node
    }
//    log.trace("RenderSiteStationMenu props.site = "+JSON.stringify(props.site))
    return (
        <Tree
            nodes={stations}// see data format
            onSelect={onSelect} // fired every click of node or leaf with selected item as argument
            theme={'my-theme'} // defaults to 'dark'. Choose from ['light', 'dark']
            customTheme={myTheme} // see `Theming`
            size={'full'} // full (default), half, narrow
            grow // in a flex box, the tree will grow to fill available space. Best used with `flex-direction: column`
            showEmptyItems // show the empty items indicator in a folder
//            isLoading //  show the loading spinner
//            noIcons // hide the default icons
//            iconSet={Object} // see `Icons`
//            containerStyle={Object} // css properties object for styling tree container
        />
        /*
        <TreeView
            defaultExpanded={['1']}
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem nodeId={String(10000+props.site.siteid)} label={props.site.site_name}>
                {props.site.stations.map(getStation)}
            </TreeItem>
        </TreeView>
         */
    );
}


export default RenderSiteStationMenu;