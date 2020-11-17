import React, {useEffect, useState} from 'react';
import '../App.css';
import Loader from "./Loader";

function RenderOverview (props) {

    let [metrics, setMetrics] = useState([]); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("MetricsPanelFunctional useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
        const timer = setTimeout(() => setLoading(true), 30000);
        if (apiPort !== props.apiPort) {
            setMetrics([])
        }
        if (loading) {
            getMetrics()
        }
        return () => clearTimeout(timer);
    }, [loading]);

    function getMetrics() {
//        console.log("MetricsPanelFunctional getMetrics props = " + JSON.stringify(props))
        if ((props && (props.apiPort !== apiPort)) || loading) {
            loading = true
            setApiPort(props.apiPort)
            fetch('http://localhost:' + props.apiPort + '/api/metrics/all')
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

    if (props.apiPort !== apiPort) {
        setMetrics([])         // Clear out sbcs so that this render doesn't rerender invalid data
        setApiPort(props.apiPort)       // Set the port
//        console.log("setLoading 10")
        setLoading(true)    // Trigger another fetch and render
        return (
            <div>
                <Loader/>
            </div>
        )
    }
    let ret = ""

    if (loading) {
         ret =
            <div>
                <Loader/>
             <div >
                 <p>unimplemented</p>
            </div>
        </div>

    } else {
        ret =
            <div >
                <p>unimplemented</p>
            </div>
    }
    return (ret)
}

export default RenderOverview;
