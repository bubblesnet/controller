
import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link, Table, Checkbox, Select} from "rendition";
import Loader from "./Loader";


function RenderTestQueueListFunctional (props) {
    let [testruns, setTestruns] = useState([]); // The array of SingleBoardComputers
    let [port, setPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data
    let [language, setLanguage] = useState("xyz"); // Trigger in useEffect that tells us to refetch data

    console.log("RenderTestQueueListFunctional props.language = " + props.language + " language = " + language )

    useEffect(() => {
        const timer = setTimeout(() => setLoading(true), 30000);
        if (port !== props.port || language !== props.language) {
            setTestruns([]  )
        }
        if (loading) {
            console.log("Getting testqueue language "+language)
            getTestQueue(language)
        } else {
        }
        return () => clearTimeout(timer);
    },[loading]);

    function selectRow(e) {
        console.log("selectRow " +e.target.id)
        clearRetest(e.target.id)
//    var testrunid = Number(e.target.id)
//        console.log("Pushing cb " + e.target)
    }

    const clearRetest = (id) => {
        let body = { }

        let fetchm = {
            method:'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }}
        fetch('http://localhost:' + props.port + '/project/retest/'+id, fetchm)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.text();
            })
            .then(data => {
                setLoading(true)
            })
            .catch(function(error) {
                console.log(error)
                setLoading(false)
                }
            );
        if( loading === false ) {
//                console.log("setLoading 3")
            setLoading(true)
        }
    }

    function displayStack(value, rowData) {
        return <p>{rowData.ciplatforms}/{rowData.buildtools}/{rowData.testframeworks}</p>
    }

    function displayName(value, rowData) {
        let ret = <p></p>
        if (value) {
            ret = <Link blank rel="noopener noreferrer" href={rowData.url}>{value}/{rowData.subprojectname}</Link>

        }
        return(ret)
    }

    function displayRetest( value, rowData ) {
        let chk = false
        if( rowData.pleaseretest === true ){
            chk = true
        }
        return<Checkbox id={rowData.buildableprojectid} checked={chk} onChange={(e)=>selectRow(e)} />
    }

    function selectLanguage(event) {
        console.log("selectLanguage " + event.option)
        props.onChangeLanguage(event.option)
    }

    function getTestQueue(language) {
        console.log("getTestQueue loading "+loading)
        if ((props && ((props.port !== port) || (props.language !== language))) || loading ) {
            loading = true
            setPort(props.port)
            setLanguage(props.language)
            fetch('http://localhost:' + props.port + '/testqueue/'+language)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
//                    console.log("setting state")
                    setTestruns(JSON.parse(data));
                    setLoading(false)
                })
                .catch(function(error) {
                    console.log(error)
                    setLoading(false)
                });
            // call getData() again in 5 seconds
        }
    }

    if (props.port !== port || props.language !== language) {
        setTestruns([])         // Clear out sbcs so that this render doesn't rerender invalid data
        setPort(props.port)       // Set the port
        setLanguage(props.language)
//        console.log("setLoading 10")
        setLoading(true)    // Trigger another fetch and render
        return (
            <div>
                <Loader/>
            </div>
        )
    }

    let ret =
            <div >
                <Select width='250px' value={language} options={[
                    'all',
                    'c',
                    'c++',
                    'go',
                    'java',
                    'node',
                    'python',
                    'rust',
                ]} />
                <Table small columns={[
                    {field: "pleaseretest", label: "Retest", render: displayRetest},
                    {field: "buildableprojectid", label: "Project ID", sortable: true},
                    {field: "name", label: "Name", render: displayName, sortable: true},
                    {field: "stars", label: "Stars", sortable: true},
                    {field: "language", label: "Language", sortable: true},
                    {field: "deploymentmechanisms", label: "Deployment", sortable: true},
                    {field: "operatingsystems", label: "OS", sortable: true},
                    {field: "testframeworks", label: "Stack", render: displayStack}]}
                       data={testruns}>
                </Table>
                <Loader/>;
            </div>
        if (loading === false) {
            console.log("returning not loading lang = " + language)
            ret =
                <div >
                     <Select width='250px' m={3} value={language} options={[
                        'all',
                        'c',
                        'c++',
                        'go',
                        'java',
                        'node',
                        'python',
                        'rust',
                        ]} onChange={selectLanguage}/>
                    <Table small columns={[
                        {field: "pleaseretest", label: "Retest", render: displayRetest},
                        {field: "buildableprojectid", label: "Project ID", sortable: true},
                        {field: "name", label: "Name", render: displayName, sortable: true},
                        {field: "stars", label: "Stars", sortable: true},
                        {field: "language", label: "Language", sortable: true},
                        {field: "deploymentmechanisms", label: "Deployment", sortable: true},
                        {field: "operatingsystems", label: "OS", sortable: true},
                        {field: "testframeworks", label: "Stack", render: displayStack}]}
                           data={testruns}>
                    </Table>
                </div>
        } else {
            console.log("returning loading language "+language)
        }
        return (ret)


}

export default RenderTestQueueListFunctional;
