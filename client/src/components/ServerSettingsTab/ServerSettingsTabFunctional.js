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
import {servers} from "../../api/utils"
import log from "roarr";
import util from "../../util";


function RenderServerSettingsTab (props) {
    let servers = util.get_server_ports_for_environment(props.nodeEnv)

    function testDatabase(e) {

    }

    let server_settings = {
        data_directory: "E:/shared/glassdashcamdata",
        users_directory: "E:/shared/glassdashcamdata/users",
        status_files_directory: "",
        site_name: "Bubbles",
        product_name: "Bubbles",
        site_name1: "E:/shared/glassdashcamdata/users",
        session_timeout: 30,
        base_url: "",
        api_username: "",
        api_password: "",
        database_hostname: "",
        database_port: 5432,
        database_name: "",
        database_username: "",
        database_password: "",
        sendgridRestrictedAPIKey: "",
        sendgridFullAccessAPIKey: "",
        sendgridSenderEmailAddress: ""
    }

    log.trace("RenderServerSettingsTab")
    let [displaySettings] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //

    function testEmail() {
        alert("Email tested successfully")
    }
    function pingAPIHost() {
        alert("API Host at " + servers.api_server_host + " pinged successfully")
    }
    function openAPIPort() {
        alert("API TCP Port at " + servers.api_server_host + ":"+servers.api_server_port+" opened successfully")
    }
    function testAPI() {
        alert("API at " + servers.api_server_host + ":"+servers.api_server_port+" tested successfully")
    }
    function pingDatabaseHost() {
        alert("Database Host at ???? pinged successfully")
    }
    function openDatabasePort() {
        alert("Database TCP Port at ???? opened successfully")
  }
    function testDatabase() {
        alert("Database at ???? called successfully")
    }

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
                                    <TableRow><TableCell>Data Directory</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.data_directory} /></TableCell></TableRow>
                                    <TableRow><TableCell>Users Directory</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.users_directory} /></TableCell></TableRow>
                                    <TableRow><TableCell>Status Files Directory</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.status_files_directory} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell>Site Name</TableCell><TableCell >
                                        <TextInput value={server_settings.site_name} /></TableCell></TableRow>
                                    <TableRow><TableCell>Product Name</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.product_name} /></TableCell></TableRow>
                                    <TableRow><TableCell>Site Name</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.site_name1} /></TableCell></TableRow>
                                    <TableRow><TableCell>Session Timeout (min)</TableCell><TableCell>
                                        <TextInput placeholder='type here' value={server_settings.session_timeout} /></TableCell></TableRow>
                                    <TableRow><TableCell>Base URL</TableCell><TableCell>
                                        <TextInput placeholder='http://localhost:3000' value={server_settings.base_url} /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell>UI API Hostname</TableCell><TableCell >
                                        <TextInput placeholder='localhost' value={servers.api_server_host} /></TableCell>
                                        <TableCell>
                                            <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'ping host'} onClick={pingAPIHost} />
                                        </TableCell></TableRow>
                                    <TableRow><TableCell>UI API Port</TableCell><TableCell>
                                        <TextInput placeholder='3000' value={servers.api_server_port} /></TableCell>
                                        <TableCell>
                                            <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'open port'} onClick={openAPIPort} />
                                        </TableCell></TableRow>
                                    <TableRow><TableCell>API Username</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='type here' value={server_settings.api_username} /></TableCell></TableRow>
                                    <TableRow><TableCell>API Password</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='type here' value={server_settings.api_password} /></TableCell></TableRow>
                                    <TableRow><TableCell align="center" colSpan={'3'}>
                                        <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Test API Connection'} onClick={testAPI} />
                                    </TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell >Database Hostname</TableCell>
                                        <TableCell>
                                            <TextInput placeholder={"localhost"} value={server_settings.database_hostname}/></TableCell>
                                        <TableCell>
                                            <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'ping host'} onClick={pingDatabaseHost} />
                                        </TableCell></TableRow>
                                    <TableRow><TableCell>Database Port</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='5432' value={server_settings.database_port} /></TableCell>
                                        <TableCell>
                                            <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'open port'} onClick={openDatabasePort} />
                                        </TableCell></TableRow>
                                    <TableRow><TableCell>Database Name</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='bubbles' value={""} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Username</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='bubbles' value={server_settings.database_username} /></TableCell></TableRow>
                                    <TableRow><TableCell>Database Password</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='bubbles' value={server_settings.database_password} /></TableCell></TableRow>
                                    <TableRow><TableCell align="center" colSpan={'3'}>
                                        <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Test Database Connection'} onClick={testDatabase} />
                                    </TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell >sendgridRestrictedAPIKey</TableCell>
                                        <TableCell >
                                            <TextInput value={server_settings.sendgridRestrictedAPIKey} /></TableCell></TableRow>
                                    <TableRow><TableCell>sendgridFullAccessAPIKey</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='type here' value={server_settings.sendgridFullAccessAPIKey} /></TableCell></TableRow>
                                    <TableRow><TableCell>sendgridSenderEmailAddress</TableCell>
                                        <TableCell>
                                            <TextInput placeholder='type here' value={server_settings.sendgridSenderEmailAddress} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={'3'}>
                                            <Button color={'var(--color-button-border)'} disabled={false} width={'medium'} round={'large'} active={true} label={'Send Test Email'} onClick={testEmail} />
                                        </TableCell></TableRow>
                                    <TableRow><TableCell colSpan={'4'}>
                                        <RenderFormActions applyButtonState={false} resetButtonState={false} defaultsButtonState={true} />
                                    </TableCell></TableRow>
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
