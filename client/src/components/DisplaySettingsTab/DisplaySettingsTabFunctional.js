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
import {Grommet, Table, TableRow, TableCell, Select} from 'grommet'
import './displaySettingsTab.css'
import RenderFormActions from "../FormActions";
import fontlist from "./fontlist.json"

import GoogleFontLoader from "react-google-font-loader";
import log from "roarr";
// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function RenderDisplaySettingsTab (props) {

    log.trace("RenderServerSettingsTab with font set to " + props.theme.global.font.family);
    let [values, setValues] = useState({units: props.display_settings.units, language: props.display_settings.language, languageOptions: props.display_settings.languageOptions, theme: props.theme, current_font: props.theme.global.font.family}); //
    let [fonts, setFonts] = useState([])
    let [local_theme, setLocalTheme] = useState(JSON.parse(JSON.stringify(props.theme)));
    let [applyButtonState, setApplyButtonState] = useState(false)
    let [resetButtonState, setResetButtonState] = useState(false)
    let [defaultsButtonState] = useState(true)

    let x = [];
    if(fonts.length === 0 ) {
        fontlist.forEach(function (item) {
            x.push(item.family)
        });
        setFonts(x)
    }

    function resetAction() {
        setValues(JSON.parse(JSON.stringify(values)))
        setResetButtonState(false);
    }

    function applyLocally(x, b) {
        setValues(x)
        setResetButtonState(b);
        setApplyButtonState(b);
    }

    function applyLanguageChangeLocally(value) {
        x = values
        values.language = value
        applyLocally(x,true)
    }

    function applyFontChangeLocally(value) {
        let x = values
        x.current_font = value
        props.onLocalFontChange(values.current_font)
        let z = local_theme
        z.global.font.family = value
        setLocalTheme(z)
        applyLocally(x,true)
    }

    function applyFontChangeGlobally() {
        props.onApplyFontChange(values.current_font)
        setResetButtonState(false);
        setApplyButtonState(false);
    }

    log.info("RenderDisplaySettingsTab with theme font set to " + local_theme.global.font.family);
    log.info("RenderDisplaySettingsTab with props.theme.global.font.family set to " + props.theme.global.font.family);
    let ret =
        <Grommet theme={props.theme}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: local_theme.global.font.family
                    },
                ]}
            />
            <div className="global_container_">
                    <Table id="settings-tab" >
                        <tbody>
                         <TableRow>
                            <TableCell className={"table-cell"}>Language</TableCell><TableCell className={"table-cell"}><Select options={values.languageOptions} value={values.language} onChange={applyLanguageChangeLocally}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Font Family</TableCell><TableCell className={"table-cell"}><Select options={fonts} value={values.current_font} onChange={({ option }) => applyFontChangeLocally(option)}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}><RenderFormActions applyButtonState={applyButtonState} resetButtonState={resetButtonState} defaultsButtonState={defaultsButtonState} applyAction={applyFontChangeGlobally} defaultsAction={resetAction} resetAction={resetAction}/></TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>
            </Grommet>
    return (ret)
}

export default RenderDisplaySettingsTab;
