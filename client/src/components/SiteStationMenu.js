import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import RenderDeviceMapTab from "./DeviceMapTab/DeviceMapTabFunctional";


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
        console.log("ev.target "+ev.target.nodeId)
        if( props.currentStationIndex === 1 ) {
            props.setCurrentStationIndex(1)
        } {
            props.setCurrentStationIndex(0)
        }
//        alert("setCurrentStationIndex " + x)
    }
    function getStation( station, index, arr ) {
        console.log("getStation = " + station.stationid)
        if( typeof station.stationid === 'undefined') {
            return <></>
        }
        let y = String(1000+station.stationid)
        console.log("nodeId = " + y)
        return <TreeItem nodeId={y} label={station.station_name} onLabelClick={setCurrentStation}/>
    }

    const classes = useStyles();
    if( typeof props.site === 'undefined') {
        props.site = {}
    }
    if( typeof props.site.stations === 'undefined') {
        props.site.stations = []
    }
//    console.log("RenderSiteStationMenu props.site = "+JSON.stringify(props.site))
    return (
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
    );
}


export default RenderSiteStationMenu;