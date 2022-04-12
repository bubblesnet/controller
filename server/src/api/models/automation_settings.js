const {sql} = require('@databases/pg');
const stage = require('./stage')
const device = require('./device')
const db = require('./database')
const server_db = require('./bubbles_db')
const pool = server_db.getPool()


async function changeStage(stationid, oldstage, newstage) {
    //    console.log(JSON.stringify(body))
    return new Promise(async function(resolve, reject) {
        await pool.query("update station SET current_stage = $1 where stationid = $2 RETURNING *",
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

async function updateStageSettings(station_id, stage_name, new_automation_settings) {

    return new Promise(async function(resolve, reject) {
        let query = "UPDATE automationsettings "+
           " SET stage_name = $1, "+
            "current_lighting_schedule = $2,"+
            "light_on_start_hour = $3,"+
            "hours_of_light = $4,"+
            "target_temperature = $5,"+
            "temperature_min=$6,"+
            "temperature_max=$7,"+
            "target_water_temperature = $8,"+
            "water_temperature_min=$9,"+
            "water_temperature_max=$10,"+
            "humidity_min=$11,"+
            "humidity_max=$12,"+
            "target_humidity=$13,"+
            "humidity_target_range_low=$14,"+
            "humidity_target_range_high=$15,"+
            "current_light_type=$16"+
            "where stationid_Station = $17 and stage_name = $18 RETURNING *"

        await pool.query( query,
            [
                new_automation_settings.stage_name,
                new_automation_settings.current_lighting_schedule,
                new_automation_settings.light_on_start_hour,
                new_automation_settings.hours_of_light,
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
    updateStageSettings
}