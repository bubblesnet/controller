import React, {useEffect, useState} from 'react';
import '../App.css';
import '../Bubbles.css'
import {Link, Box, Button, Table, Checkbox, Select} from "rendition";
import Loader from "./Loader";

let moment = require('moment');

function RenderTestRunListFunctional (props) {
    let [selectedprojects, setSelectedprojects] = useState([]);
    let [selectedcheckboxes, setSelectedcheckboxes]  = useState([]);
    let [testruns, setTestruns] = useState([]); // The array of SingleBoardComputers
    let [port, setPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("renderTestRunListFunctional useEffect")
        const timer = setTimeout(() => setLoading(true), 30000);
        if (port !== props.port) {
            setTestruns([])
        }
        if (loading) {
            getTestRun()
        }
        return () => clearTimeout(timer);
    }, [loading]);

    let selectRow = (e) => {
//        console.log(e.target.id)
        let testrunid = Number(e.target.id)
        selectedprojects.push(testrunid)
//        console.log("Pushing cb " + e.target)
        selectedcheckboxes.push(e.target)
    }

    let displaySelected = (value, rowData) => {
        let ret = <Checkbox id={rowData.testrunid} checked={false}
                            onChange={(rowData, checked) => selectRow(rowData, checked)}/>
        if (selectedcheckboxes.length !== 0)
            ret = <Checkbox id={rowData.testrunid} onChange={(rowData, checked) => selectRow(rowData, checked)}/>
        return (ret)
    }

    function retestSelected() {
//        console.log(selectedprojects[0])
        fetch('http://localhost:' + props.port + '/testruns/retest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({selectedprojects: selectedprojects}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                //               console.log(data);
//               $('input:checkbox').removeAttr('checked');
                for (let i = 0; i < selectedcheckboxes.length; i++) {
                    console.log(selectedcheckboxes[i])
//                    selectedcheckboxes[i].removeAttr('checked');
//                    cb.setChecked( false);
                }
                setSelectedprojects( [] )
                setSelectedcheckboxes([])
            });
    }

    let retestOne = () => {
        let testrunid = prompt('Retest TestRun by ID');
        let selectedprojects = []
        selectedprojects.push({testrunid: Number(testrunid)})
        fetch('http://localhost:' + props.port + '/testruns/retest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({selectedprojects: selectedprojects}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                selectedprojects = []
                selectedcheckboxes = []
//               alert(data);
                //               getTestRun();
            });
    }
    /*
         deleteTestRun() {
            let id = prompt('Enter testrun id');
            fetch(`http://localhost:3001/testruns/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    alert(data);
                    getTestRun();
                });
        }
    */

    let displayStack = (value, rowData) => {
        let stack = rowData.language + " " + rowData.ciplatforms + " " + rowData.buildtools + " " + rowData.testframeworks
        stack = stack.replace(/\|/g," ")
        let ret = <span
            className="success">{stack}</span>
        if (rowData.result !== "success") {
            ret = <p>{stack}</p>
        }
        return (ret)
    }
    let displayDeployment = (value, rowData) => {
        let ret = <span className="success">{rowData.operatingsystems}/{rowData.deploymentmechanisms}</span>
        if (rowData.result !== "success") {
            ret = <p>{rowData.operatingsystems}/{rowData.deploymentmechanisms}</p>
        }
        return (ret)
    }


    let displayLeak = (value, rowData) => {
        let ret = <p/>
        if (value) {
            if (rowData.ephemeraldiskfreembend > 0) {
                ret = <p>{value}</p>
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

    let displayResult = (value, rowData) => {
        let ret = <span className="success">{value}</span>
        if (value !== "success") {
            ret = value
        }
        return (ret)
    }

    let displayName = (value, rowData) => {
        let ret = <p></p>
        if (value) {
            if (rowData.result === "success") {
                ret =
                    <span className={"success"}><Link blank rel="noopener noreferrer" href={rowData.url}>{value}</Link></span>
            } else {
                ret = <Link blank rel="noopener noreferrer" href={rowData.url}>{value}/{rowData.subprojectname}</Link>
            }
        }
        return (ret)
    }

    let displayIP = (value, rowData) => {
        let ret = <Link/>
        if (value) {
            let url = "http://" + rowData.ipaddress + "/output"
            ret = <div>{rowData.board} <Link blank rel="noopener noreferrer" href={url}>{value}</Link></div>
        }
        return (ret)
    }

    let gotoLink = (option) => {
//        alert(JSON.stringify(option))
        window.open(option.url);
    }


    let displayStage1 = (value, rowData) => {
        let stageName = rowData.failedonstage.replace(" ", "_");
        let val = stageName + ' ' + rowData.result
        if (rowData.result === 'success') {
            val = 'success'
        }

        let url = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName
        let outurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName + "/stdout.txt"
        let errurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName + "/stderr.txt"
        let travisurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/travis_script_sh.txt"
        let travisymlurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/.travis.yml"
        let icebreakerurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/icebreaker_log.txt"

        const urls = [
            url,
            outurl,
            errurl,
            travisymlurl,
            travisurl,
            icebreakerurl
        ]
        return (<Select id={rowData.testrunid*100} width='250px'
                        onChange={({ option }) => gotoLink(option)}
                        labelKey="label"
                        valueKey="label"
                        value={{label: val, url: url}} options={[
            {label: val, url: url},
            {label: 'stdout', url:  outurl},
            {label: 'stderr', url: errurl},
            {label: 'travis', url: travisymlurl},
            {label: 'script', url: travisurl},
            {label: 'app log', url: icebreakerurl}
        ]} />);
    }

    let displayStage = (value, rowData) => {
        let travisymlurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/.travis.yml"
        let travisurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/travis_script_sh.txt"
        let icebreakerurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/icebreaker_log.txt"
        let ret = <div>
            <Link blank rel="noopener noreferrer" href={travisymlurl}>travis yml</Link><br/>
            <Link blank rel="noopener noreferrer" href={travisurl}>travis script</Link><br/>
            <Link blank rel="noopener noreferrer" href={icebreakerurl}>app log</Link>
        </div>

        if (value) {
            let stageName = rowData.failedonstage.replace(" ", "_");
            if (rowData.failedonstage === "")
                stageName = "Test"
            let url = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName
            let outurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName + "/stdout.txt"
            let errurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/" + stageName + "/stderr.txt"
            travisurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/" + rowData.testrunid + "/travis_script_sh.txt"
            icebreakerurl = "http://" + rowData.ipaddress + "/output/" + rowData.name + "/icebreaker_log.txt"
            ret = <div><Link blank rel="noopener noreferrer" href={url}>{value}</Link><br/>
                <Link blank rel="noopener noreferrer" href={outurl}>stdout</Link><br/>
                <Link blank rel="noopener noreferrer" href={errurl}>stderr</Link><br/>
                <Link blank rel="noopener noreferrer" href={travisurl}>travis script</Link><br/>
                <Link blank rel="noopener noreferrer" href={icebreakerurl}>app log</Link>
            </div>
        }
        return (ret)
    }

    function getTestRun() {
        if ((props && (props.port !== port)) || loading) {
            loading = true
            setPort(props.port)
            fetch('http://localhost:' + props.port + '/testruns')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    setTestruns(JSON.parse(data))
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

    let ret =
        <div>
            <Box my={3} mx={['auto', 15]}>
                <Button secondary emphasized onClick={() => retestOne()}>Retest One Testrun</Button>
                <Button primary emphasized onClick={() => retestSelected()}>Retest Selected</Button>
            </Box>
            <Table small columns={[
                {label: "", render: displaySelected},
//                {field: "board", label: "Board", cellAttributes: "nowrap"},
                {field: "ipaddress", label: "Worker", render: displayIP, sortable: true},
                {field: "ts", label: "Date", render: displayDate, sortable: true},
                {field: "name", label: "Name", render: displayName, sortable: true},
//                {field: "result", label: "Result", render: displayResult, sortable: true},
                {field: "failedonstage", label: "Stage", render: displayStage1, sortable: true},
                {field: "stagefailuremessage", label: "Reason", sortable: true},
                {field: "language", label: "Stack", sortable: true, render: displayStack}
//                {field: "leak", label: "Leak", render: displayLeak},
//                {field: "deploymentmechanisms", label: "Deployment", sortable: true, render: displayDeployment}
            ]}
                   data={testruns}>
            </Table>
            <Loader/>;
        </div>
    if (loading === false) {
        ret =
            <div>
                <Box my={3} mx={['auto', 15]}>
                    <Button secondary emphasized onClick={() => retestOne()}>Retest One Testrun</Button>
                    <Button primary emphasized onClick={() => retestSelected()}>Retest Selected</Button>
                </Box>
                <Table small columns={[
                    {label: "", render: displaySelected},
//                    {field: "board", label: "Board", cellAttributes: "nowrap"},
                    {field: "ipaddress", label: "Board", render: displayIP, sortable: true},
                    {field: "ts", label: "Date", render: displayDate, sortable: true},
                    {field: "name", label: "Name", render: displayName, sortable: true},
//                    {field: "result", label: "Result", render: displayResult, sortable: true},
                    {field: "failedonstage", label: "Stage", render: displayStage1, sortable: true},
                    {field: "stagefailuremessage", label: "Reason", sortable: true},
                    {field: "language", label: "Stack", sortable: true, render: displayStack}
//                    {field: "leak", label: "Leak", render: displayLeak},
//                    {field: "deploymentmechanisms", label: "Deployment", sortable: true, render: displayDeployment}
                ]}
                       data={testruns}>
                </Table>
            </div>
    }
    return (ret)
}

export default RenderTestRunListFunctional;
