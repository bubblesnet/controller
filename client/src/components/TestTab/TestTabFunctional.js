import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet} from 'grommet'
import RenderTestButton from './TestButtonFunctional'

/// TODO check copyright and license

function RenderTestTab (props) {

    let [loading, setLoading] = useState(true); // Trigger in useEffect that tells us to refetch data

    useEffect(() => {
        console.log("TestTab.useEffect loading="+loading)
    }, [loading]);

    let ret =
            <Grommet >
                <div className="global_container_">
                    <p>RenderTestTab</p>
                    <p>props.count = {props.count}</p>
                    <p>props.loading = {props.loading}</p>
                    <RenderTestButton onChange={props.onChange}/>
                    <p>/RenderTestTab</p>
               </div>
            </Grommet>
    return (ret)
}

export default RenderTestTab;
