
import React, {useEffect, useState} from 'react';
import './App.css';
import Loader from "./Loader";
import {Button, Checkbox, Table} from "rendition";
var moment = require('moment');

function RenderDeviceStatusListFunctional(props) {
    console.log("render RenderDeviceStatusListFunctional")
    return (
        <div>
            <RenderDeviceStatusRecord port={props.port}/>
        </div>
    );
}

function RenderDeviceStatusRecord(props) {
    console.log("render devicestatusrecord")

    let [devicerecord, setDevicerecord] = useState([]); // The array of SingleBoardComputers
    let [port, setPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("RenderDeviceStatusRecord useEffect")
        const timer = setTimeout(() => setLoading(true), 5000);
        if (port !== props.port) {
            setDevicerecord([])
        }
        if (loading) {
            getDeviceStatusRecord()
        }
        return () => clearTimeout(timer);
    }, [loading]);

    function getDeviceStatusRecord() {
//        console.log("RenderDeviceStatusRecord loading " + loading)
        if ((props && (props.port !== port)) || loading) {
            loading = true
            setPort(props.port)
            //           console.log("********************************************* props = " + props)
            fetch('http://localhost:' + props.port + '/devicestatus/all')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log("setDev " + data)
                    setDevicerecord(JSON.parse(data))
//                    console.log("setLoading 5")
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                    if (loading === true) {
//                        console.log("setLoading 6")
                        setLoading(false)
                    }
                });
        }
    }

    let filterDevicerecordByDate = () => {
        let x = []
        let now = moment();
        var arrayLength = devicerecord.length;
        for (var i = 0; i < arrayLength; i++) {
            let rowData = devicerecord[i]
            let then = moment(rowData.ts)
            let days = now.diff(then, 'days');
            if (days < 21) {
                x.push(rowData)
            }
        }
        return (x)
    }

    let displayDiskSpace = (value, rowData) => {
        let ret = <p/>
        if (value) {
            if (rowData.ephemeraldiskfreembstart < 500 || rowData.persistentdiskfreembstart < 500) {
                ret = <span
                    className="emergency">{rowData.ephemeraldiskfreembstart}/{rowData.persistentdiskfreembstart}</span>
            } else {
                ret = <p>{rowData.ephemeraldiskfreembstart}/{rowData.persistentdiskfreembstart}</p>
            }
        }
        return (ret)
    }

    let displayDate = (value, rowData) => {
        let ret = <p/>
        if (value) {
            ret = <p>{moment(value).fromNow()}</p>
        }
        return (ret)
    }

    let displaySelected = (value, rowData) => {
        return <Checkbox/>
    }

    let displayName = (value, rowData) => {
        let ret = <p/>
        if (value) {
            if (rowData.subprojectname) {
                ret =
                    <a target="_blank" rel="noopener noreferrer" href={rowData.url}>{value}/{rowData.subprojectname}</a>
            } else {
                ret = <a target="_blank" rel="noopener noreferrer" href={rowData.url}>{value}</a>
            }
        }
        return (ret)
    }

    let displayCIstack = (value, rowData) => {
        return <p>{rowData.ciplatforms} {rowData.deploymentmechanisms}</p>
    }

    let displayStack = (value, rowData) => {
        return <p>{rowData.language} {rowData.operatingsystem} {rowData.buildtools} {rowData.testframeworks}</p>
    }

    let displayIP = (value, rowData) => {
        let ret = <p/>
        if (value) {
            var now = moment((new Date()).getTime())
            var url = "http://" + rowData.ipaddress + "/output"
            if (rowData.result !== "in-progress" && rowData.result !== "") {
                if (rowData.result === "fails") {
                    ret = <Button danger emphasized tooltip={rowData.board + "\n" + rowData.externalid} target="_blank"
                                  rel="noopener noreferrer"
                                  href={url}>{value}</Button>
                } else {
                    ret = <Button success emphasized tooltip={rowData.board + "\n" + rowData.externalid} target="_blank"
                                  rel="noopener noreferrer"
                                  href={url}>{value}</Button>
                }
            } else if (moment(now).diff(rowData.ts) > (1000 * 60 * 60)) {
                ret = <Button tertiary tooltip={rowData.board + "\n" + rowData.externalid}>{value}</Button>
            } else {
                ret = <Button primary emphasized tooltip={rowData.board + "\n" + rowData.externalid} target="_blank"
                              rel="noopener noreferrer"
                              href={url}>{value}</Button>
            }
        }
        return (ret)

    }

    let displayStage = (value, rowData) => {
        let ret = <p>{rowData.result}</p>
        if (value) {
            let icebreakerurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/icebreaker_log.txt"
            ret = <Button target="_blank" rel="noopener noreferrer" href={icebreakerurl}>{value}</Button>
        }
        return (ret)
    }

    let ret
    let x = filterDevicerecordByDate()
    let sortoptions = {field: "ts", reverse: true}
    if (loading) {
        ret =
            <div>
                <Table small columns={[
                    //                   {label: "", render: displaySelected },
                    {field: "ipaddress", label: "IP", render: displayIP, sortable: true},
                    {
                        field: "ephemeraldiskfreembstart",
                        label: "Disk free",
                        render: displayDiskSpace,
                        sortable: true
                    },
                    {field: "name", label: "Project", render: displayName, sortable: true},
                    {field: "stars", label: "Stars", sortable: true},
                    {field: "failedonstage", label: "Stage", render: displayStage, sortable: false},
                    {field: "ts", label: "Started run", render: displayDate, sortable: true},
                    {field: "language", label: "Stack", render: displayStack, sortable: false},
                    {field: "ciplatforms", label: "CI Stack", render: displayCIstack, sortable: false},
                ]}
                       sort={sortoptions}
                       data={x}>
                </Table>
                <Loader/>;
            </div>
    } else {
        ret = <div>
            <Table small columns={[
                //                   {label: "", render: displaySelected },
                {field: "ipaddress", label: "IP", render: displayIP, sortable: true},
                {
                    field: "ephemeraldiskfreembstart",
                    label: "Disk free",
                    render: displayDiskSpace,
                    sortable: true
                },
                {field: "name", label: "Project", render: displayName, sortable: true},
                {field: "stars", label: "Stars", sortable: true},
                {field: "failedonstage", label: "Stage", render: displayStage, sortable: false},
                {field: "ts", label: "Started run", render: displayDate, sortable: true},
                {field: "language", label: "Stack", render: displayStack, sortable: false},
                {field: "ciplatforms", label: "CI Stack", render: displayCIstack, sortable: false},
            ]}
                   sort={sortoptions}
                   data={x}>
            </Table>
        </div>
    }
    return (ret)
}

export default RenderDeviceStatusListFunctional

