//import {Button} from "rendition";
import {Button} from "rendition";
import {Table} from "grommet";
import React from "react";
import RenderProductRow from "./ProductRow";

function RenderProductTable(props) {
    console.log("RenderProductTable render port = " + props.port + " sbcs length " + props.sbcs.length )
    let empty = {manufacturer: "", productname: "", retail_price: "0"}
    let ret = <RenderProductRow onProductTableUpdate={props.onProductTableUpdate} sbc={[empty]} key={-1}/>

    let onRowDelete = (id) => {
//        console.log('onRowDelete '+id)
        props.onRowDelete(id)
    }

    if( typeof(props.sbcs) !== "undefined") {
        ret =
            <div>
                <Button dark default color="control" onClick={props.onRowAdd}>Add</Button>
                <Table>
                    <thead>
                    <tr>
                        <th>Mfr</th>
                        <th>Product</th>
                        <th>CPU</th>
                        <th>eMMC</th>
                        <th>SD</th>
                        <th>BLE</th>
                        <th>10Mb</th>
                        <th>100Mb</th>
                        <th>1G</th>
                        <th>Price</th>
                        <th>Wifi a</th>
                        <th>b</th>
                        <th>g</th>
                        <th>ac</th>
                        <th>n</th>
                        <th>USB2</th>
                        <th>USB3</th>
                        <th>OTG</th>
                        <th>Balena</th>
                        <th>Particle</th>
                        <th>Azure</th>
                        <th>Google</th>
                        <th>Amazon</th>
                    </tr>
                    </thead>
                </Table>
            </div>

          let tableBody = props.sbcs.map(function (sbc) {
              let tableRow = <RenderProductRow onProductTableUpdate={props.onProductTableUpdate} port={props.port} sbc={sbc}
                                               onRowDelete={id => onRowDelete(id)}
                                            key={sbc.sbcid}/>
                      return (tableRow)
            }
        );
        ret =
            <div align="end">
                <Button dark default color="control" onClick={props.onRowAdd}>Add</Button>
                <Table>
                    <thead>
                    <tr>
                        <th>Mfr</th>
                        <th>Product</th>
                        <th>CPU</th>
                        <th>eMMC</th>
                        <th>SD</th>
                        <th>BLE</th>
                        <th>10Mb</th>
                        <th>100Mb</th>
                        <th>1G</th>
                        <th>Price</th>
                        <th>Wifi a</th>
                        <th>b</th>
                        <th>g</th>
                        <th>ac</th>
                        <th>n</th>
                        <th>USB2</th>
                        <th>USB3</th>
                        <th>OTG</th>
                        <th>Balena</th>
                        <th>Particle</th>
                        <th>Azure</th>
                        <th>Google</th>
                        <th>Amazon</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tableBody}
                    </tbody>
                </Table>
            </div>
    }
    return (ret)
}


export default RenderProductTable