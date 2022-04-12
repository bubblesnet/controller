import React, { useState} from 'react';
import RenderTestTab from "./components/TestTab/TestTabFunctional";

function TestApp (props) {

    const [loading] = useState(false); // Trigger in useEffect that tells us to refetch data
    const [count, setCount] = useState(1)

    function onChange() {
        setCount(count+1)
    }
    console.log("TestApp rendering")

    return (
        <>
            <p>RenderTestApp loading = {loading} count = {count}</p>
            <RenderTestTab count={count} loading={loading} onChange={onChange}/>
            <p>/RenderTestApp</p>
            </>
    );
}

export default TestApp