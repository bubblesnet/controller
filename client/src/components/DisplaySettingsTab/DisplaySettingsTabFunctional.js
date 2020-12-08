import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, TextInput, Table, TableRow, TableCell, Select, RadioButton, RadioButtonGroup} from 'grommet'
import './displaySettingsTab.css'
import RenderFormActions from "../FormActions";
import fontlist from './fontlist.json'
import GoogleFontLoader from "react-google-font-loader";

function RenderDisplaySettingsTab (props) {

    console.log("RenderApplicationSettingsTab with font set to " + props.display_settings.theme.global.font.family);
    let [text, setText] = useState({}); //
    let [values, setValues] = useState({units: props.display_settings.units, language: props.display_settings.language, languageOptions: props.display_settings.languageOptions, theme: props.display_settings.theme, current_font: props.display_settings.current_font}); //
    let [fonts, setFonts] = useState([])

    let x = [];
    if(fonts.length == 0 ) {
        fontlist.forEach(function (item) {
            x.push(item.family)
        });
        setFonts(x)
    }

    function applyFontChangeLocally(value) {
        let x = values
        console.log("applyFontChangeLocally from "+values.current_font+" to " + value + " props " + props.display_settings.theme.global.font.family)
        x.current_font = value
        console.log("applyFontChangeLocally afterwards props " + props.display_settings.theme.global.font.family)
        props.onLocalFontChange(values.current_font)
        console.log("applyFontChangeLocally final "+values.current_font)
    }

    function applyFontChangeGlobally() {
        let x = values
        console.log("applyFontChangeGlobally from "+x.theme.global.font.family+" to " + values.current_font + " props " + props.display_settings.theme.global.font.family)
        props.onApplyFontChange(values.current_font)
        console.log("applyFontChangeGlobally afterwards props " + props.display_settings.theme.global.font.family)
    }

    useEffect(() => {
        console.log("RenderDisplaySettingsTab useEffect font="+values.theme.global.font.family)
    }, [values]);

    console.log("RenderApplicationSettingsTab with local font set to " + values.current_font);
    let ret =
        <Grommet theme={values.theme}>
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
                            <TableCell className={"table-cell"}>Measurement Units </TableCell><TableCell className={"table-cell"}><RadioButtonGroup name="units" options={["IMPERIAL","METRIC"]} value={values.units}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={"table-cell"}>Language </TableCell><TableCell className={"table-cell"}><Select options={values.languageOptions} value={values.language}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Font Family</TableCell><TableCell className={"table-cell"}><Select options={fonts} value={values.current_font} onChange={({ option }) => applyFontChangeLocally(option)}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={'2'}><RenderFormActions applyAction={applyFontChangeGlobally}/></TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                </div>
        </Grommet>
    return (ret)
}

export default RenderDisplaySettingsTab;
