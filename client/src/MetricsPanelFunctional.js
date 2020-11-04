import React, {useEffect, useState} from 'react';
import './App.css';
import { Table} from "rendition";
import Loader from "./Loader";

function RenderMetrics (props) {

    let [metrics, setMetrics] = useState([]); // The array of SingleBoardComputers
    let [port, setPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("MetricsPanelFunctional useEffect")
        const timer = setTimeout(() => setLoading(true), 30000);
        if (port !== props.port) {
            setMetrics([])
        }
        if (loading) {
            getMetrics()
        }
        return () => clearTimeout(timer);
    }, [loading]);

    function getMetrics() {
//        console.log("MetricsPanelFunctional getMetrics props = " + JSON.stringify(props))
        if ((props && (props.port !== port)) || loading) {
            loading = true
            setPort(props.port)
            fetch('http://localhost:' + props.port + '/metrics/all')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    setMetrics(JSON.parse(data))
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

    if (props.port !== port) {
        setMetrics([])         // Clear out sbcs so that this render doesn't rerender invalid data
        setPort(props.port)       // Set the port
//        console.log("setLoading 10")
        setLoading(true)    // Trigger another fetch and render
        return (
            <div>
                <Loader/>
            </div>
        )
    }

    let ret =
        <div>
            <Loader/>
        </div>

    if (loading) {
        ret =
            <div>
                <Loader/>
             <Table columns={[
                {field: "language", label: "Language", sortable: true},
                {field: "successpercent", label: "% success", sortable: true},
                {field: "successcount", label: "# success", sortable: true},
                {field: "testedcount", label: "# completed test", sortable: true},
                {field: "untestedcount", label: "# untested", sortable: true},
                {field: "crashcount", label: "# crashed runs", sortable: true},
                {field: "runcount", label: "# runs", sortable: true},
                {field: "total", label: "# total", sortable: true}
            ]}
                   data={metrics}>
            </Table>
        </div>

    } else {
//        console.log("MetricsPanel render port = " + props.port)
        ret =
            <div>
                <Table columns={[
                    {field: "language", label: "Language", sortable: true},
                    {field: "successpercent", label: "% success", sortable: true},
                    {field: "successcount", label: "# success", sortable: true},
                    {field: "testedcount", label: "# completed test", sortable: true},
                    {field: "untestedcount", label: "# untested", sortable: true},
                    {field: "crashcount", label: "# crashed runs", sortable: true},
                    {field: "runcount", label: "# runs", sortable: true},
                    {field: "total", label: "# total", sortable: true}
                ]}
                       data={metrics}>
                </Table>
            </div>
    }
    return (ret)
}

export default RenderMetrics;
