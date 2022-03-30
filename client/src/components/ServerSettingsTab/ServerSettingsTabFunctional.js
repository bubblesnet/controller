import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
    Button,
    Grommet,
    TextInput,
    Table,
    TableRow,
    TableCell
} from 'grommet'
import './applicationSettingsTab.css'
import RenderFormActions from "../FormActions";
import GoogleFontLoader from "react-google-font-loader";
import log from "roarr";


function RenderServerSettingsTab (props) {

    function testDatabase(e) {

    }

    log.trace("RenderServerSettingsTab")
    let [displaySettings] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //


    log.trace("rendering with font set to " + displaySettings.theme.global.font.family)
    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: displaySettings.theme.global.font.family
                    },
                ]}
            />
            <div className="global_container_">
                    <Table id="settings-tab" >
                        <tbody>
                        <TableRow>
                            <TableCell colSpan="3">
                                <Table id="advanced-table">
                                    <tbody>
                                    <TableRow><TableCell>Data Directory</TableCell><TableCell><TextInput placeholder='type here' value={"E:/shared/glassdashcamdata"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Users Directory</TableCell><TableCell><TextInput placeholder='type here' value={"E:/shared/glassdashcamdata/users"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Status Files Directory</TableCell><TableCell><TextInput placeholder='type here' value={"E:/shared/bubblesstatus"} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell>Site Name</TableCell><TableCell ><TextInput value={"Bubbles"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Product Name</TableCell><TableCell><TextInput placeholder='type here' value={"Bubbles"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Site Name</TableCell><TableCell><TextInput placeholder='type here' value={"Bubbles Development"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Session Timeout (min)</TableCell><TableCell><TextInput placeholder='type here' value={"30"} /></TableCell></TableRow>
                                    <TableRow><TableCell>Base URL</TableCell><TableCell><TextInput placeholder='http://localhost:3000' value={""} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell >API Hostname</TableCell><TableCell ><TextInput placeholder='localhost' value={""} /></TableCell><TableCell><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'ping host'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell>API Port</TableCell><TableCell><TextInput placeholder='3000' value={""} /></TableCell><TableCell><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'open port'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell>API Username</TableCell><TableCell><TextInput placeholder='type here' value={"bubbles"} /></TableCell></TableRow>
                                    <TableRow><TableCell>API Password</TableCell><TableCell><TextInput placeholder='type here' value={"bubbles"} /></TableCell></TableRow>
                                    <TableRow><TableCell align="center" colSpan={'3'}><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Test API Connection'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell >Database Hostname</TableCell><TableCell><TextInput placeholder={"localhost"} value={""}/></TableCell><TableCell><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'ping host'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Port</TableCell><TableCell><TextInput placeholder='5432' value={""} /></TableCell><TableCell><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'open port'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Name</TableCell><TableCell><TextInput placeholder='bubbles' value={""} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Username</TableCell><TableCell><TextInput placeholder='bubbles' value={""} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Password</TableCell><TableCell><TextInput placeholder='bubbles' value={""} /></TableCell></TableRow>
                                    <TableRow><TableCell align="center" colSpan={'3'}><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Test Database Connection'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell >sendgridRestrictedAPIKey</TableCell><TableCell ><TextInput value={"xxxx"} /></TableCell></TableRow>
                                    <TableRow><TableCell>sendgridFullAccessAPIKey</TableCell><TableCell><TextInput placeholder='type here' value={"xxxx"} /></TableCell></TableRow>
                                    <TableRow><TableCell>sendgridSenderEmailAddress</TableCell><TableCell><TextInput placeholder='type here' value={"me@mydomain.com"} /></TableCell></TableRow>
                                    <TableRow><TableCell align="center" colSpan={'3'}><Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Send Test Email'} onClick={testDatabase} /></TableCell></TableRow>
                                    <TableRow><TableCell colSpan={'4'}><RenderFormActions applyButtonState={false} resetButtonState={false} defaultsButtonState={true} /></TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>
        </Grommet>
    return (ret)
}

export default RenderServerSettingsTab;
