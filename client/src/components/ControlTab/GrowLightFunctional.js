import React, {useEffect, useState} from 'react';
import '../../App.css';
import RenderThermometer from "./ThermometerFunctional";
import RenderHygrometer from "./HygrometerFunctional";

function RenderGrowLight (props) {
    let ret
        if( props.on === false ) {
            ret =
                <div className="growlight-container-off">
                    <div className="growlight-off" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-night" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer currentTemperature="82F" />
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer currentTemperature="80F" />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer currentTemperature="78F" />
                        </div>
                    </div>
                    <div id="humidity-holder" >
                        <RenderHygrometer currentHumidity="48"/>
                    </div>

                </div>
        } else {
            ret =
                <div className="growlight-container-on">
                    <div className="growlight-on" />
                    <div className="plant-holder" />
                    <div id="airtemp-holder-day" >
                        <div id="airtemptop-text-holder">
                            <RenderThermometer currentTemperature="86F" />
                        </div>
                        <div id="airtempmiddle-text-holder">
                            <RenderThermometer currentTemperature="84F" />
                        </div>
                        <div id="airtempbottom-text-holder">
                            <RenderThermometer currentTemperature="82F" />
                        </div>
                    </div>
                    <div id="humidity-holder" >
                            <RenderHygrometer currentHumidity="43"/>
                    </div>

                </div>
        }
    return (ret)
}

export default RenderGrowLight;



