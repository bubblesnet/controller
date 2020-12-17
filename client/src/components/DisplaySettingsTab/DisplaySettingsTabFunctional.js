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

    console.log("RenderApplicationSettingsTab with font set to " + props.state.display_settings.theme.global.font.family);
    let [values, setValues] = useState({units: props.state.display_settings.units, language: props.state.display_settings.language, languageOptions: props.state.display_settings.languageOptions, theme: props.state.display_settings.theme, current_font: props.state.display_settings.theme.global.font.family}); //
    let [fonts, setFonts] = useState([])
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
        applyLocally(x,true)
    }

    function applyFontChangeGlobally() {
        let x = values
        console.log("applyFontChangeGlobally from "+x.theme.global.font.family+" to " + values.current_font + " props " + props.state.display_settings.theme.global.font.family)
        props.onApplyFontChange(values.current_font)
        console.log("applyFontChangeGlobally afterwards props " + props.state.display_settings.theme.global.font.family)
        setResetButtonState(false);
        setApplyButtonState(false);
    }

    useEffect(() => {
        console.log("RenderDisplaySettingsTab useEffect font="+values.theme.global.font.family)
    }, [values]);

    console.log("RenderApplicationSettingsTab with local font set to " + values.current_font);
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
