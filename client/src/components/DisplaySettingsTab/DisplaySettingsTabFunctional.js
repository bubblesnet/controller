import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, TextInput, Table, TableRow, TableCell, Select, RadioButton, RadioButtonGroup} from 'grommet'
import './displaySettingsTab.css'
import RenderFormActions from "../FormActions";
import fontlist from './fontlist.json'
import GoogleFontLoader from "react-google-font-loader";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';


function RenderDisplaySettingsTab (props) {

    console.log("RenderServerSettingsTab with font set to " + props.theme.global.font.family);
    let [values, setValues] = useState({units: props.state.display_settings.units, language: props.state.display_settings.language, languageOptions: props.state.display_settings.languageOptions, theme: props.theme, current_font: props.theme.global.font.family}); //
    let [fonts, setFonts] = useState([])
    let [local_theme, setLocalTheme] = useState(JSON.parse(JSON.stringify(props.theme)));
    let [applyButtonState, setApplyButtonState] = useState(false)
    let [resetButtonState, setResetButtonState] = useState(false)
    let [defaultsButtonState, setDefaultsButtonState] = useState(true)

    let x = [];
    if(fonts.length == 0 ) {
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

    function applyUnitChangeLocally(value) {
        x = JSON.parse(JSON.stringify(values))
        x.units = value
        applyLocally(x,true)
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
        let x = values
        props.onApplyFontChange(values.current_font)
        setResetButtonState(false);
        setApplyButtonState(false);
    }

    console.log("RenderServerSettingsTab with theme font set to " + local_theme.global.font.family);
    let ret =
        <Grommet theme={local_theme}>
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
                            <TableCell className={"table-cell"}>
                                <FormattedMessage id={"measurement_units"}
                                                  defaultMessage={"Measurement Units"} /> </TableCell><TableCell className={"table-cell"}>
                            <RadioButtonGroup name="units" options={["IMPERIAL","METRIC"]} value={values.units}
                                              onChange={event => applyUnitChangeLocally(event.target.value)}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={"table-cell"}>Language </TableCell><TableCell className={"table-cell"}><Select options={values.languageOptions} value={values.language} onChange={applyLanguageChangeLocally}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Font Family</TableCell><TableCell className={"table-cell"}><Select options={fonts} value={values.current_font} onChange={({ option }) => applyFontChangeLocally(option)}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={'2'}><RenderFormActions applyButtonState={applyButtonState} resetButtonState={resetButtonState} defaultsButtonState={defaultsButtonState} applyAction={applyFontChangeGlobally} resetAction={resetAction}/></TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>
            </Grommet>
    return (ret)
}

export default RenderDisplaySettingsTab;
