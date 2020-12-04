import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {TextInput, Table, TableRow, TableCell, Select, RadioButton} from 'grommet'
import './setupTab.css'
import RenderFormActions from "../FormActions";

function RenderSetupTab (props) {

    console.log("RenderSetupTab")
    let [text, setText] = useState({
    }); //

    useEffect(() => {
        console.log("RenderOverview useEffect port="+props.apiPort + " nodeEnv "+props.nodeEnv)
    }, [text]);

    function changeFont(e)
    {
        setText(e.target.value)
        props.onFontChange(e.target.value)
    }

    let ret =
                <div className="global_container_">
                    <Table id="settings-tab" >
                        <tbody>
                        <TableRow>
                            <TableCell colSpan="3">
                                <Table id="advanced-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Advanced Settings</td></tr></thead>
                                    <tbody>
                                    <TableRow>
                                        <TableCell>Theme Font</TableCell>
                                        <TableCell><TextInput placeholder={'exact font name'} onBlur={event => changeFont(event)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow><TableCell>datadirectory</TableCell><TableCell>E:/shared/glassdashcamdata</TableCell></TableRow>
                                    <TableRow><TableCell>usersdirectory</TableCell><TableCell>E:/shared/glassdashcamdata/users</TableCell></TableRow>
                                    <TableRow><TableCell>statusfilesdirectory</TableCell><TableCell>E:/shared/bubblesstatus</TableCell></TableRow>
                                    <TableRow><TableCell>sitename</TableCell><TableCell>Bubbles</TableCell></TableRow>
                                    <TableRow><TableCell>sessionTimeoutInMinutes</TableCell><TableCell>30</TableCell></TableRow>
                                    <TableRow><TableCell>sitename</TableCell><TableCell>Bubbles Development</TableCell></TableRow>
                                    <TableRow><TableCell>baseurl</TableCell><TableCell>http://localhost:3000</TableCell></TableRow>
                                    <TableRow><TableCell>productname</TableCell><TableCell>Bubbles</TableCell></TableRow>
                                    <TableRow><TableCell>googleanalytics_key</TableCell><TableCell>UA-42571213-2</TableCell></TableRow>
                                    <TableRow><TableCell>dbusername</TableCell><TableCell>bubbles</TableCell></TableRow>
                                    <TableRow><TableCell>dbpw</TableCell><TableCell>bubbles</TableCell></TableRow>
                                    <TableRow><TableCell>sendgridRestrictedAPIKey</TableCell><TableCell>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</TableCell></TableRow>
                                    <TableRow><TableCell>sendgridFullAccessAPIKey</TableCell><TableCell>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</TableCell></TableRow>
                                    <TableRow><TableCell>sendgridSenderEmailAddress</TableCell><TableCell>rodley@rodley.com</TableCell></TableRow>
                                    <TableRow><TableCell colSpan={'2'}><RenderFormActions /></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>
    return (ret)
}

export default RenderSetupTab;
