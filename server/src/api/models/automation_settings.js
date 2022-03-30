const {sql} = require('@databases/pg');
const stage = require('./stage')
const device = require('./device')
const db = require('./database')
const server_db = require('./bubbles_db')
const pool = server_db.getPool()


async function changeStage(stationid, oldstage, newstage) {
    //    console.log(JSON.stringify(body))
    return new Promise(async function(resolve, reject) {
        await pool.query("update station set current_stage = $1 where stationid = $2 RETURNING *",
            [newstage,stationid], (error, results) => {
                if (error) {
                    console.log("changeStage error " + error)
                    reject(error)
                } else {
                    console.log("changeStage " + JSON.stringify(results.rows[0]))
                    resolve({stationid: results.rows[0].stationid, stage: newstage, message: "Station "+results.rows[0].stationid+" stage has been updated to " + newstage})
                }
            })
    })
}

async function updateAutomationSettings(station_id, stage_name, new_automation_settings) {
    console.log("updateAutomationSettings ("+station_id+") (" + stage_name + ") " + JSON.stringify(new_automation_settings))

    return new Promise(async function(resolve, reject) {
        await pool.query("update automationsettings set " +
            "stage_name = $1, " +
            "current_lighting_schedule = $2,"+
            "light_on_start_hour = $3,"+
            "target_temperature = $4,"+
            "temperature_min=$5,"+
            "temperature_max=$6,"+
            "target_water_temperature = $7,"+
            "water_temperature_min=$8,"+
            "water_temperature_max=$9,"+
            "humidity_min=$10,"+
            "humidity_max=$11,"+
            "target_humidity=$12,"+
            "humidity_target_range_low=$13,"+
            "humidity_target_range_high=$14,"+
            "current_light_type=$15 " +
            "where stationid_Station = $16 and stage_name = $17 RETURNING *",
            [
                new_automation_settings.stage_name,
                new_automation_settings.current_lighting_schedule,
                new_automation_settings.light_on_start_hour,
                new_automation_settings.target_temperature,
                new_automation_settings.temperature_min,
                new_automation_settings.temperature_max,
                new_automation_settings.target_water_temperature,
                new_automation_settings.water_temperature_min,
                new_automation_settings.water_temperature_max,
                new_automation_settings.humidity_min,
                new_automation_settings.humidity_max,
                new_automation_settings.target_humidity,
                new_automation_settings.humidity_target_range_low,
                new_automation_settings.humidity_target_range_high,
                new_automation_settings.current_light_type,
                station_id, stage_name ], (error, results) => {
                if (error) {
                    console.log("updateAutomationSettings error " + error)
                    reject(error)
                } else {
                    console.log("updateAutomationSettings result (" + JSON.stringify(results.rows[0])+")")
                    resolve(new_automation_settings)
                }
            })
    })
}

module.exports = {
    changeStage,
    updateAutomationSettings
}