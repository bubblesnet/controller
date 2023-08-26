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

import React from "react";
import {RadioButtonGroup} from "rendition";
import log from "roarr";
import {ReadyState} from "react-use-websocket";
import {Table,TableRow,TableCell,Button} from 'grommet'
import '../Palette.css'

// import log from "./bubbles_logger"

// copyright and license inspection - no issues 4/13/22

function RenderEnvironmentPickerFunctional(props) {

    let setNodeEnv = (value) => {
        log.trace("EnvironmentPicker set nodeEnv to " + value)
        props.handleSetEnvironment( value )
    }

    let webSocketLabel="WebSocket"
    if( props.readyState !== ReadyState.OPEN ) {
        webSocketLabel = "WS down"
    }

        return (
        <div>
            <RadioButtonGroup
                padding="10px"
                className="RenderEnvironmentPickerFunctional"
                name="environment"
                direction="row-responsive"
                options={['development', 'test', 'production']}
                value={props.nodeEnv} onChange={(event) => setNodeEnv(event.target.value)}
            />
            <div className="RenderPingerFunctional" >
                <Table className="pinger-table">
                    <tbody>
                    <TableRow>
                        <TableCell>
                            Ping
                        </TableCell>
                        <TableCell>
                            <Button
                                    color={'var(--color-button-border)'}
                                           disabled={props.readyState !== ReadyState.OPEN}
                                           size={'small'}
                                           round={'small'}
                                            active={true}
                                           label={webSocketLabel}
                                           onClick={props.handleWebSocketPing} />
                        </TableCell>
                        <TableCell>
                            <Button color={'var(--color-button-border)'}
                                           disabled={false}
                                           size={'small'}
                                           round={'small'}
                                            active={true}
                                           label={'API'}
                                           onClick={props.handleAPIPing} />
                        </TableCell>
                        <TableCell>
                            <Button color={'var(--color-button-border)'}
                                           disabled={false}
                                           size={'small'}
                                           round={'small'}
                                            active={true}
                                           label={'ActiveMQ'}
                                           onClick={props.handleActiveMQPing} />
                        </TableCell>
                    </TableRow>
                    </tbody>
                </Table>
            </div>
        </div>)

}

export default RenderEnvironmentPickerFunctional;