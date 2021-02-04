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


function RenderUserSetupTab (props) {
    let [applyButtonState, setApplyButtonState] = useState(false)
    let [resetButtonState, setResetButtonState] = useState(false)
    let [defaultsButtonState, setDefaultsButtonState] = useState(false)

    let [username, setUsername] = useState(props.username)
    let [email, setEmail] = useState(props.email)
    let [password, setPassword] = useState("")
    let [firstName, setFirstName] = useState(props.firstName)
    let [lastName, setLastName] = useState(props.lastName)

    function testDatabase(e) {

    }
    function addUser() {
        console.log("addUser")
    }
    function resetForm() {
        setEmail(props.email)
        setFirstName(props.firstName)
        setLastName(props.lastName)
        setPassword("")
    }
    function changeEmail(e) {
        setEmail(e.target.value)
        setApplyButtonState(true)
        setResetButtonState(true)
    }
    function changePassword(e) {
        setPassword(e.target.value)
        setApplyButtonState(true)
        setResetButtonState(true)
    }
    function changeFirstName(e) {
        setFirstName(e.target.value)
        setApplyButtonState(true)
        setResetButtonState(true)
    }
    function changeLastName(e) {
        setLastName(e.target.value)
        setApplyButtonState(true)
        setResetButtonState(true)
    }
    console.log("RenderUserSetupTab")
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr'], theme: props.theme}); //


    console.log("rendering with font set to " + values.theme.global.font.family)
    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: values.theme.global.font.family
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
                                    <TableRow><TableCell>Username:</TableCell><TableCell><TextInput onChange={changeEmail} value={username} disabled={true}/></TableCell></TableRow>
                                    <TableRow><TableCell>Email address:</TableCell><TableCell><TextInput onChange={changeEmail} value={email} /></TableCell></TableRow>
                                    <TableRow><TableCell>First name:</TableCell><TableCell><TextInput  onChange={changeFirstName} value={firstName} /></TableCell></TableRow>
                                    <TableRow><TableCell>Last name:</TableCell><TableCell><TextInput  onChange={changeLastName} value={lastName} /></TableCell></TableRow>
                                    <TableRow><TableCell>Password: </TableCell><TableCell><TextInput  onChange={changePassword} type={"password"}  /></TableCell></TableRow>
                                    <TableRow><TableCell>Confirm password:</TableCell><TableCell><TextInput type={"password"}  /></TableCell></TableRow>
                                    <TableRow><TableCell border={"top"} colSpan={"4"} /></TableRow>
                                    <TableRow><TableCell colSpan={'4'}><RenderFormActions applyButtonState={applyButtonState} applyAction={addUser} resetButtonState={resetButtonState} resetAction={resetForm} defaultsButtonState={false} /></TableCell></TableRow>
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

export default RenderUserSetupTab;
