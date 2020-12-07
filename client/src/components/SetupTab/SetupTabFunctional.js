import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../../Palette.css';
import '../../overview_style.css'
import {Grommet, TextInput, Table, TableRow, TableCell, Select, RadioButton, RadioButtonGroup} from 'grommet'
import './setupTab.css'
import RenderFormActions from "../FormActions";
import fontlist from './fontlist.json'
import GoogleFontLoader from "react-google-font-loader";

function RenderSetupTab (props) {

    console.log("RenderSetupTab")
    let [text, setText] = useState({}); //
    let [values, setValues] = useState({units: 'IMPERIAL', language: 'en-us', languageOptions:['en-us','fr']}); //
    let [themex, setThemex] = useState(props.theme ); //
    let [fonts, setFonts] = useState([])

    let x = [];
    if(fonts.length == 0 ) {
        fontlist.forEach(function (item) {
            x.push(item.family)
            console.log(x);
        });
        setFonts(x)
    }

    const changeFont = (value) => {
        let x = themex
        x.global.font.family = value
        setThemex(x)
        props.onFontChange(value)
    }
    console.log("rendering with font set to " + themex.global.font.family)
    let ret =
        <Grommet theme={themex}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: themex.global.font.family
                    },
                ]}
            />
            <div className="global_container_">
                    <Table id="settings-tab" >
                        <tbody>
                        <TableRow>
                            <TableCell colSpan="3">
                                <Table id="advanced-table">
                                    <thead><tr><td className="centered-thead-text" colSpan="2">Advanced Settings</td></tr></thead>
                                        <thead><tr><td className="centered-thead-text" colSpan="2" >Localization</td></tr></thead>
                                        <tbody>
                                        <TableRow>
                                            <TableCell className={"table-cell"}>Measurement Units </TableCell><TableCell className={"table-cell"}><RadioButtonGroup name="units" options={["IMPERIAL","METRIC"]} value={values.units}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"table-cell"}>Language </TableCell><TableCell className={"table-cell"}><Select options={values.languageOptions} value={values.language}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Theme Font </TableCell><TableCell className={"table-cell"}><Select options={fonts} value={themex.global.font.family} onChange={({ option }) => changeFont(option)}/>
                                            </TableCell>
                                        </TableRow>

                                    <TableRow><TableCell border={'top'}>datadirectory</TableCell><TableCell border={'top'}>E:/shared/glassdashcamdata</TableCell></TableRow>
                                    <TableRow><TableCell>usersdirectory</TableCell><TableCell>E:/shared/glassdashcamdata/users</TableCell></TableRow>
                                    <TableRow><TableCell>statusfilesdirectory</TableCell><TableCell>E:/shared/bubblesstatus</TableCell></TableRow>
                                    <TableRow><TableCell border={'top'}>sitename</TableCell><TableCell border={'top'}>Bubbles</TableCell></TableRow>
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
        </Grommet>
    return (ret)
}

export default RenderSetupTab;
