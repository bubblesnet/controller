/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {
//    Button,
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
// import log from "./bubbles_logger"
// copyright and license inspection - no issues 4/13/22

function RenderUserSetupTab (props) {
    let [applyButtonState, setApplyButtonState] = useState(false)
    let [resetButtonState, setResetButtonState] = useState(false)

    let [username] = useState(props.username)
    let [email, setEmail] = useState(props.email)
    let [password, setPassword] = useState("")
    let [firstName, setFirstName] = useState(props.firstName)
    let [lastName, setLastName] = useState(props.lastName)

    function addUser() {
        log.trace("addUser")
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
    log.trace("RenderUserSetupTab")
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
