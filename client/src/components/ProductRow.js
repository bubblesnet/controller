import { Checkbox} from "rendition";
import {Button} from "grommet";
import {TextInput} from "grommet";
import React from "react";

function RenderProductRow(props) {
    let onRowDelete = () => {
//        console.log('onRowDelete '+props.sbc.sbcid)
        props.onRowDelete(props.sbc.sbcid)
    }

    let AbstractCell = (sbc,fieldname, id) => {
        let value = ""
        if(typeof(sbc[fieldname]) !== "undefined" && sbc[fieldname] !== null) {
            value = sbc[fieldname]
        }
        return (
            <RenderEditableCell cellData={{
                type: fieldname,
                value: value,
                id: id
            }}/>
        );
    }


    let ret = <tr />
    ret =
        <tr className="eachRow">
            {AbstractCell(props.sbc,"manufacturer",(props.sbc.sbcid * 100) + 1)}
            {AbstractCell(props.sbc,"productname", (props.sbc.sbcid*100)+2)}
            {AbstractCell(props.sbc,"cpu", (props.sbc.sbcid*100)+3)}
            {AbstractCell(props.sbc,"emmc", (props.sbc.sbcid*100)+4)}
            {AbstractCell(props.sbc,"sd_card", (props.sbc.sbcid*100)+5)}
            {AbstractCell(props.sbc,"ble_version", (props.sbc.sbcid*100)+6)}
            {AbstractCell(props.sbc,"ethernet10", (props.sbc.sbcid*100)+7)}
            {AbstractCell(props.sbc,"ethernet100", (props.sbc.sbcid*100)+8)}
            {AbstractCell(props.sbc,"ethernet1000", (props.sbc.sbcid*100)+9)}
            {AbstractCell(props.sbc,"retail_price", (props.sbc.sbcid*100)+10)}
            {AbstractCell(props.sbc,"x_80211a", (props.sbc.sbcid*100)+11)}
            {AbstractCell(props.sbc,"x_80211b", (props.sbc.sbcid*100)+12)}
            {AbstractCell(props.sbc,"x_80211g", (props.sbc.sbcid*100)+13)}
            {AbstractCell(props.sbc,"x_80211ac", (props.sbc.sbcid*100)+14)}
            {AbstractCell(props.sbc,"x_80211n", (props.sbc.sbcid*100)+15)}
            {AbstractCell(props.sbc,"usb_20", (props.sbc.sbcid*100)+16)}
            {AbstractCell(props.sbc,"usb_30", (props.sbc.sbcid*100)+17)}
            {AbstractCell(props.sbc,"usb_otg", (props.sbc.sbcid*100)+18)}
            {AbstractCell(props.sbc,"cloud_deployment_balena", (props.sbc.sbcid*100)+19)}
            {AbstractCell(props.sbc,"cloud_deployment_particle", (props.sbc.sbcid*100)+20)}
            {AbstractCell(props.sbc,"cloud_deployment_azure", (props.sbc.sbcid*100)+21)}
            {AbstractCell(props.sbc,"cloud_deployment_google", (props.sbc.sbcid*100)+22)}
            {AbstractCell(props.sbc,"cloud_deployment_amazon", (props.sbc.sbcid*100)+23)}
            <td className="del-cell">
                <Button onClick={onRowDelete} text="X" label="X" value="X" className="del-btn"/>
            </td>
        </tr>
    return(ret)
}

function RenderEditableCell(props) {
    const [checked, setChecked] = React.useState(props.cellData.value);

    const updateSBC = (event) => {
        setChecked(event.target.checked)
        let sbcid = Math.round(event.target.id/100)
        if (props) {
            let body = { sbcid: sbcid,
                fieldname: props.cellData.type, value: event.target.checked}

            let fetchm = {
                method:'PUT',
                body: JSON.stringify(body),
                headers: {
                'Content-Type': 'application/json'
            }}

            fetch('http://localhost:' + props.apiPort + '/sbc/'+sbcid, fetchm)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
//                    console.log("fetched good data "+data)
                })
                .catch(function(error) {
                    console.log(error)
                });
        } else {
//            console.log("no props or already loading")
        }
    }

    function onChangeTextCell(evt) {
        console.log("RenderEditableCell onChangeTextCell evt "+evt.target.id)
    }

    let ret =  <td>
        <Checkbox name={props.cellData.type} apiPort={props.apiPort} id={""+(props.cellData.id)}
                  checked={checked} onChange={(event) => updateSBC(event)}/>
    </td>
    if (typeof (props.cellData.value) !== 'boolean') {
        let value = ""
        if (typeof (props.cellData.value) !== 'undefined' || props.cellData.value === null  ) {
            value = props.cellData.value
        }
        ret =
            <td>
                <TextInput name={props.cellData.type} id={""+props.cellData.id} apiPort={props.apiPort}
                           value={value} placeholder={props.placeholder} onChange={onChangeTextCell}/>
            </td>
    }
    return(ret)
}

export default RenderProductRow