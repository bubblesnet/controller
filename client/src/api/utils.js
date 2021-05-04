async function getContainerNames(host, port) {
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

async function getModuleTypes(host, port) {
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
async function getSite (host, port, siteid) {
    console.log("getSite calling out to api")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://'+host+':'+port+'/api/station/site/'+siteid);
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
 * Get the list of devices (Pi) attached to the specified user.
 *
 * @param host      hostname or ip of the controller API server
 * @param port      port number of the controller API server
 * @param userid    ID of the logged-in user
 * @returns {Promise<unknown>}  Response status (200 ...) from the API call
 * @todo this is redundant with getSite - eliminate
 */
const getDeviceList = (host, port, userid) => {
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
const saveSetting = ( host, port, userid, thing_name, present ) => {
    console.log("saveSetting calling out to api")

    return new Promise( async (resolve, reject) => {
        const url = 'http://'+host+':'+port+'/api/config/'+userid+'/'+'70000007'+'/sensor/'+thing_name+'/present/'+present;
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

const addStation = ( host, port, siteid, station_name ) => {
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
//           console.log(JSON.stringify(x))
//            console.log("Put station " + JSON.stringify(x));
            resolve(x)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}



module.exports = {
    addStation,
    getModuleTypes,
    getContainerNames,
    getDeviceList,
    saveSetting,
    getSite
}