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


// copyright and license inspection - no issues 4/13/22

export async function getContainerNames(host, port) {
    console.log("getContainerNames calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/containers');
        if(response.ok) {
            let x = await response.json();
            console.log("Got container_names " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
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
        console.log("getStage calling out to api "+url )
        const response = await fetch(url);
        if(response.ok) {
            let x = await response.json();
            console.log("getStage got stage " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}


export async function getModuleTypes(host, port) {
    console.log("getModuleTypes calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/config/modules');
        if(response.ok) {
            let x = await response.json();
            console.log("Got module_types " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
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
    console.log("getSite calling out to api")

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/site/'+siteid
        console.log('getSite calling '+url)
        const response = await fetch(url);
//            const response = await fetch('http://'+host+':'+port+'/api/config/90000009/70000007');
        console.log("getSite response received")
        if(response.ok) {
//            console.log("getSite awaiting site")
            let x = await response.json();
//            console.log("getSite Got " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("getSite error " + response.status)
            reject( response.status )
        }
    })
}

/**
 * Get the crop of the station specified by stationid from the API.
 *
 * @param host      hostname or ip of the controller API server
 * @param port      port number of the controller API server
 * @param stationid    ID of the station we want
 * @returns {Promise<unknown>}  Response status (200 ...) from the API call
 */
export async function getCrop (host, port, stationid) {
    console.log("getCrop calling out to api")

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/station/'+stationid+'/crop'
        console.log('getCrop calling '+url)
        const response = await fetch(url);
//            const response = await fetch('http://'+host+':'+port+'/api/config/90000009/70000007');
        console.log("getCrop response received")
        if(response.ok) {
//            console.log("getCrop awaiting site")
            let x = await response.json();
//            console.log("getCrop Got " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("getCrop error " + response.status)
            reject( response.status )
        }
    })
}

// http://192.168.21.237:3003/api/station/1/events/
// http://192.168.21.237:3003/api/station/1/events
export async function getLastNEvents (host, port, stationid, count) {
    console.log("getLastNEvents calling out to api")

    return new Promise( async (resolve, reject) => {
        let url = 'http://'+host+':'+port+'/api/station/'+stationid+'/events/'
        console.log(url)
        const response = await fetch(url);
        console.log("returned response = " + JSON.stringify(response))
        if(response.ok) {
            let x = await response.json();
//            console.log(JSON.stringify(x))
//            console.log("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}

export async function getUser (host, port, userid) {
    console.log("getSite calling out to api")

    return new Promise( async (resolve, reject) => {
        let url='http://'+host+':'+port+'/api/user/'+userid
        console.log('getSite calling '+url)
        const response = await fetch(url);
        console.log("getSite response received")
        if(response.ok) {
            let x = await response.json();
            resolve(x)
        } else {
            console.log("getSite error " + response.status)
            reject( response.status )
        }
    })
}

export async function saveStage (host, port, stationid, current_stage) {
    console.log("saveStage calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/station/'+stationid+'/stage/'+current_stage);
        console.log("saveStage response received")
        if(response.ok) {
            let x = await response.json();
            resolve(x)
        } else {
            console.log("saveStage error " + response.status)
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
    console.log("getDeviceList calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/device/'+userid);
        if(response.ok) {
            let x = await response.json();
//            console.log(JSON.stringify(x))
//            console.log("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
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
        console.log("saveSetting url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        if(response.ok) {
            let x = await response.json();
//            console.log(JSON.stringify(x))
//            console.log("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
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
        console.log("saveAutomationSetting url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_automation_settings )
        });
        if(response.ok) {
            let x = await response.json();
            console.log(JSON.stringify(x))
//            console.log("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}


export const changeStage = ( host, port, stationid, oldstage, newstage ) => {

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/station/'+stationid+'/stage/';
        console.log("changeStage url = " + url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldstage: oldstage, newstage: newstage })
        });
        if(response.ok) {
            let x = await response.json();
//            console.log(JSON.stringify(x))
//            console.log("Got devices " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}


export const addStation = async ( host, port, siteid, station_name ) => {
    console.log("addStation calling out to api ")

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/station/site/'+siteid+'/'+station_name;
        console.log("fetching " + url )
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        if(response.ok) {
            let x = await response.json();
            console.log(JSON.stringify(x))
            console.log("Put station " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}
