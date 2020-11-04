import React,{useState,useEffect} from "react";
import RenderProductTable from "./ProductTable";
import Loader from "./Loader";

    function RenderSBCEditor (props) {
        console.log("renderSBCEditor with props = " + JSON.stringify(props))
        let [sbcs, setSbcs] = useState([]); // The array of SingleBoardComputers
        let [port, setPort] = useState(0);  // The port we should send queries to - depends on dev/test/prod
        let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data


        useEffect(() => {
            if (port !== props.port) {
                setSbcs([])
            }
            if (loading) {
                getBoardList(props, port, setSbcs, setLoading, setPort)
            } else {
            }
        },[loading]);

        function getBoardList (props, port, setSbcs, setLoading, setPort)  {
//            console.log("SBCEditor getBoardList props = "+JSON.stringify(props))
            if ((props && (props.port !== port)) || loading ) {
                setPort(props.port)
                fetch('http://localhost:' + props.port + '/sbc/all')
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.text();
                    })
                    .then(data => {
                        setSbcs(JSON.parse(data))
//                        console.log("setLoading 5")
                        setLoading(false)
                    })
                    .catch(function(error) {
                        console.log(error)
                        if( loading === true ) {
//                            console.log("setLoading 6")
                            setLoading(false)
                        }
                    });
            } else {
            }
        }

        let addEmptySBC = () => {
//            console.log("addEmptySBC")
            let body = { }

            let fetchm = {
                method:'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }}
            fetch('http://localhost:' + props.port + '/sbc', fetchm)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    if( loading === true ) {
//                        console.log("setLoading 1")
                        setLoading(false)
                    }
                })
                .catch(function(error) {
                    console.log(error)
                    if( loading === true ) {
//                        console.log("setLoading 2")
                        setLoading(false)
                    }
                });
            if( loading === false ) {
//                console.log("setLoading 3")
                setLoading(true)
            }
        }


         let handleAddEvent = (evt) => {
             addEmptySBC()
        };

        let onRowDelete = (id) =>{
            let body = { }
//            console.log('loading http://localhost:' + props.port + '/sbc')
//            let id = Math.round((evt.id/100))
            let fetchm = {
                method:'DELETE',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }}
//            console.log('hitting http://localhost:' + props.port + '/sbc/'+id)
            fetch('http://localhost:' + props.port + '/sbc/'+id, fetchm)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
 //                   console.log("setLoading 7")
                    setLoading(false)
                })
                .catch(function(error) {
                    console.log(error)
 //                   console.log("setLoading 8")
                    setLoading(false)
                });
//            console.log("setLoading 9")
            setLoading(true)
        };

        if( props.port !== port ) {
            setSbcs([])         // Clear out sbcs so that this render doesn't rerender invalid data
            setPort(props.port)       // Set the port
//            console.log("setLoading 10")
            setLoading(true)    // Trigger another fetch and render
            return (
                <div>
                    <Loader/>
                </div>
            )
        }
         let ret =
            <div>
                <Loader />
            </div>

        if( !loading ) {
            ret =
                <div>
                    <RenderProductTable
                                        onRowAdd={e => handleAddEvent(e)} onRowDelete={e => onRowDelete(e)}
                                        sbcs={sbcs} port={props.port} database={props.database}
                    />
                </div>
        }
        return (ret)
    }

export default RenderSBCEditor