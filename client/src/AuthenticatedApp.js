import React, {useEffect, useState} from 'react';

import {Tabs, Tab} from "rendition";
import Header from "./components/Header"

import RenderControlTab from "./components/ControlTab/ControlTabFunctional";
import RenderStatusTab from "./components/StatusTab/StatusTabFunctional";
import RenderEvents from "./components/EventsFunctional";
import RenderSettings from "./components/SettingsTab/SettingsTabFunctional"
import RenderSetup from "./components/SetupTab/SetupTabFunctional"
import RenderStageTab from "./components/StageTabs/StageTabFunctional"
import {Grommet} from "grommet";


function AuthenticatedApp (props) {
    let initialthemex = {
        "name": "bubblesnet",
        "rounding": 4,
        "spacing": 24,
        "defaultMode": "light",
        "global": {
            "colors": {
                "brand": {
                    "dark": "477CBC",
                    "light": "#477CBC"
                },
                "background": {
                    "dark": "#111111",
                    "light": "#FFFFFF"
                },
                "background-back": {
                    "dark": "#111111",
                    "light": "#EEEEEE"
                },
                "background-front": {
                    "dark": "#222222",
                    "light": "#FFFFFF"
                },
                "background-contrast": {
                    "dark": "#FFFFFF11",
                    "light": "#11111111"
                },
                "text": {
                    "dark": "#EEEEEE",
                    "light": "#333333"
                },
                "text-strong": {
                    "dark": "#FFFFFF",
                    "light": "#000000"
                },
                "text-weak": {
                    "dark": "#CCCCCC",
                    "light": "#444444"
                },
                "text-xweak": {
                    "dark": "#999999",
                    "light": "#666666"
                },
                "border": {
                    "dark": "#444444",
                    "light": "#CCCCCC"
                },
                "control": "brand",
                "active-background": "background-contrast",
                "active-text": "text-strong",
                "selected-background": "brand",
                "selected-text": "text-strong",
                "status-critical": "#FF4040",
                "status-warning": "#FFAA15",
                "status-ok": "#00C781",
                "status-unknown": "#CCCCCC",
                "status-disabled": "#CCCCCC",
                "graph-0": "brand",
                "graph-1": "status-warning"
            },
            "font": {
                "family": "Comic Sans MS"
            },
            "active": {
                "background": "active-background",
                "color": "active-text"
            },
            "hover": {
                "background": "active-background",
                "color": "active-text"
            },
            "selected": {
                "background": "selected-background",
                "color": "selected-text"
            }
        },
        "chart": {},
        "diagram": {
            "line": {}
        },
        "meter": {},
        "layer": {
            "background": {
                "dark": "#111111",
                "light": "#FFFFFF"
            }
        }
    }

    console.log("BubblesApp render props = " + JSON.stringify(props))
    let [nodeEnv, setNodeEnv] = useState("production"); // The array of SingleBoardComputers
    let [apiPort, setApiPort] = useState(3001);  // The port we should send queries to - depends on dev/test/prod
    let [language, setLanguage] = useState("all");
    let [themex,setThemex] = useState(initialthemex);

    let fontChange = (value) => {
        if( value === '' ) {
            return;
        }
        let x = themex;
        if( value !== x.global.font.family ) {
            return;
        }
        alert("font changed from " + themex.global.font.family + " to " + value)
        x.global.font.family = value;
        setThemex(x)
    }

    let setLang = (value) => {
        console.log("AuthenticatedApp setting language to " + value)
        setLanguage(value)
    }

    let setEnvironment = (value) => {
        console.log("AuthenticatedApp.setEnvironment(" + value + ")")
        const theNodeEnvironment = value;
        let theApiPort;
        if (theNodeEnvironment === "production") {
            theApiPort = 3001;
        } else if (theNodeEnvironment === "test") {
            theApiPort = 3002;
        } else if (theNodeEnvironment === "development") {
            theApiPort = 3003;
        }
        console.log("setting state db to " + theNodeEnvironment + " port to " + theApiPort)
        setNodeEnv(theNodeEnvironment);
        setApiPort(theApiPort);
    }

    console.log("Rendering App")
    return (

        <div className="App">
            <Header setNodeEnv={setEnvironment}/>
            <Tabs margin="medium" flex="shrink" >
                <Tab title="Cabinet Control" >
                    <RenderControlTab nodeEnv={nodeEnv} apiPort={apiPort} theme={themex}/>
                </Tab>
                <Tab title="Status">
                    <RenderStatusTab nodeEnv={nodeEnv} apiPort={apiPort} theme={themex}/>
                </Tab>
                <Tab title="Cabinet Setup">
                    <RenderSettings nodeEnv={nodeEnv} apiPort={apiPort} theme={themex}/>
                </Tab>
                <Tab title="Automation">
                    <RenderStageTab nodeEnv={nodeEnv} apiPort={apiPort} theme={themex}/>
                </Tab>
                <Tab title="Events">
                    <RenderEvents nodeEnv={nodeEnv} apiPort={apiPort} theme={themex}/>
                </Tab>
                <Tab title="App Settings">
                    <RenderSetup nodeEnv={nodeEnv} apiPort={apiPort} onFontChange={fontChange} theme={themex}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthenticatedApp