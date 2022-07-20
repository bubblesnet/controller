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

import '../logimplementation'
import log from 'roarr';

// copyright and license inspection - no issues 4/13/22

export async function getContainerNames(host, port) {
    log.trace("getContainerNames calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/containers');
        if(response.ok) {
            let x = await response.json();
            log.trace("Got container_names " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}

export function getAutomationSetting( automation_settings, stage_name ) {
    for( let i = 0; i < automation_settings.length; i++ ) {
        if( automation_settings[i].stage_name === stage_name ) {
            return( automation_settings[i])
        }
    }
    return({})
}

export async function getStage(host, port, stationid, stage) {

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/station/'+stationid+'/stage/'+stage
        log.trace("getStage calling out to api "+url )
        const response = await fetch(url);
        if(response.ok) {
            let x = await response.json();
            log.trace("getStage got stage " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}


export async function getModuleTypes(host, port) {
    log.trace("getModuleTypes calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/modules');
        if(response.ok) {
            let x = await response.json();
            log.trace("Got module_types " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}

/**
 * Get the configuration of the SITE specified by siteid from the API.
 *
 * @param host      hostname or ip of the controller API server
 * @param port      port number of the controller API server
 * @param siteid    ID of the site we want
 * @returns {Promise<unknown>}  Response status (200 ...) from the API call
 */
export async function getSite (host, port, siteid) {
    log.trace("getSite calling out to api")

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/site/'+siteid
        log.info('getSite calling '+url)
        const response = await fetch(url);
//            const response = await fetch('http://'+host+':'+port+'/api/config/90000009/70000007');
        log.trace("getSite response received")
        if(response.ok) {
//            log.trace("getSite awaiting site")
            let x = await response.json();
//            log.trace("getSite Got " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("getSite error " + response.status)
            reject( response.status )
        }
    })
}
// http://192.168.21.237:3003/api/station/1/events/
// http://192.168.21.237:3003/api/station/1/events
export async function getLastNEvents (host, port, stationid, count) {
    log.trace("getLastNEvents calling out to api")

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/station/'+stationid+'/events/'
        log.trace(url)
        const response = await fetch(url);
        log.trace("returned response = " + JSON.stringify(response))
        if(response.ok) {
            let x = await response.json();
//            log.trace(JSON.stringify(x))
//            log.trace("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}

export async function getUser (host, port, userid) {
    log.trace("getSite calling out to api")

    return new Promise( async (resolve, reject) => {
        let url='http://'+host+':'+port+'/api/user/'+userid
        log.trace('getSite calling '+url)
        const response = await fetch(url);
        log.trace("getSite response received")
        if(response.ok) {
            let x = await response.json();
            resolve(x)
        } else {
            log.trace("getSite error " + response.status)
            reject( response.status )
        }
    })
}

export async function saveStage (host, port, stationid, current_stage) {
    log.trace("saveStage calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/station/'+stationid+'/stage/'+current_stage);
        log.trace("saveStage response received")
        if(response.ok) {
            let x = await response.json();
            resolve(x)
        } else {
            log.trace("saveStage error " + response.status)
            reject( response.status )
        }
    })
}

/**
 * Get the list of devices (Pi) attached to the specified user.
 *
 * @param host      hostname or ip of the controller API server
 * @param port      port number of the controller API server
 * @param userid    ID of the logged-in user
 * @returns {Promise<unknown>}  Response status (200 ...) from the API call
 * @todo this is redundant with getSite - eliminate
 */
export const getDeviceList = (host, port, userid) => {
    log.trace("getDeviceList calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/device/'+userid);
        if(response.ok) {
            let x = await response.json();
//            log.trace(JSON.stringify(x))
//            log.trace("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}

/**
 * Save to persistent store an individual presence/absence setting for a single
 * sensor/control item in the current station.
 *
 * @param thing_name    The unique name of the sensor/control item
 * @param present       True/false - true present, false absent
 * @returns {Promise<unknown>}  The response status (200,500 ...) from the save setting API call
 * @memberOf AuthenticatedApp
 */
export const saveSetting = ( host, port, userid, stationid, thing_name, present ) => {

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/config/'+userid+'/'+stationid+'/sensor/'+thing_name+'/'+present;
        log.debug("saveSetting url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        if(response.ok) {
            let x = await response.json();
//            log.trace(JSON.stringify(x))
//            log.trace("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}

/**
 * Save to persistent store an individual presence/absence setting for a single
 * sensor/control item in the current station.
 *
 * @param thing_name    The unique name of the sensor/control item
 * @param present       True/false - true present, false absent
 * @returns {Promise<unknown>}  The response status (200,500 ...) from the save setting API call
 * @memberOf AuthenticatedApp
 */
export const saveAutomationSettings = ( host, port, userid, stationid, stage_name, new_automation_settings ) => {

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/automation/'+stationid+'/'+stage_name;
        log.debug("saveAutomationSetting url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_automation_settings )
        });
        if(response.ok) {
            let x = await response.json();
            log.trace(JSON.stringify(x))
//            log.trace("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            log.error("error " + response.status)
            reject( response.status )
        }
    })
}


export const changeStage = ( host, port, stationid, oldstage, newstage ) => {

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/station/'+stationid+'/stage/';
        log.debug("changeStage url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldstage: oldstage, newstage: newstage })
        });
        if(response.ok) {
            let x = await response.json();
//            log.trace(JSON.stringify(x))
//            log.trace("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}


export const addStation = async ( host, port, siteid, station_name ) => {
    log.trace("addStation calling out to api ")

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/station/site/'+siteid+'/'+station_name;
        log.trace("fetching " + url )
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        if(response.ok) {
            let x = await response.json();
            log.trace(JSON.stringify(x))
            log.trace("Put station " + JSON.stringify(x));
            resolve(x)
        } else {
            log.trace("error " + response.status)
            reject( response.status )
        }
    })
}
