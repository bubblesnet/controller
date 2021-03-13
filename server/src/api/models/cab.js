const {sql} = require('@databases/pg');
const db = require('./database');

async function getConfigByUser(uid) {
    const results = await db.query(sql`SELECT userid, firstname, lastname, email, username, created, deleted, timezone, provisioned, mobilenumber FROM public.user where userid=${uid}`);
    let result = results[0]
    result.cabinets = await getCabinetConfigsByUser(uid)
    console.log("\n\n\n"+JSON.stringify(result))
    return( result )
}

async function getCabinetConfigsByUser(uid) {
    const results = await db.query(
        sql`
            SELECT cabinetid, controller_hostname, controller_api_port, stage, light_on_hour, tamper_xmove, tamper_ymove, tamper_zmove,
                   time_between_pictures_in_seconds, time_between_sensor_polling_in_seconds, humidifier, humidity_sensor_internal,
                   humidity_sensor_external, heater, thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
                   thermometer_water, water_pump, air_pump, light_sensor_internal, cabinet_door_sensor, outer_door_sensor, movement_sensor,
                   pressure_sensors, root_ph_sensor, enclosure_type, water_level_sensor, tub_depth, tub_volume, intake_fan, exhaust_fan,
                   heat_lamp, heating_pad, light_bloom, light_vegetative, light_germinate, height_sensor, automatic_control, 
                                   coalesce(
                                           (
                                               SELECT array_to_json(array_agg(row_to_json(x)))
                                               FROM (
                                                        SELECT c.cabinetid AS cabinetid,
                                                               d.deviceid  AS deviceid,
                                                               coalesce((
                                                                            SELECT array_to_json(array_agg(row_to_json(y)))
                                                                            FROM (
                                                                                     SELECT moduleid,
                                                                                            module_name,
                                                                                            container_name,
                                                                                            module_type,
                                                                                            i2caddress     as address,
                                                                                            protocol,
                                                                                            coalesce((
                                                                                                         SELECT array_to_json(array_agg(row_to_json(y)))
                                                                                                         FROM (
                                                                                                                  SELECT sensorid, sensor_name, measurement_name, extraconfig
                                                                                                                  from sensor s
                                                                                                                  where s.moduleid_module = n.moduleid
                                                                                                              ) y)
                                                                                                ,
                                                                                                     '[]') as included_sensors
                                                                                     from module n
                                                                                     where n.deviceid_device = d.deviceid
                                                                                 ) y)
                                                                   , '[]') as modules

                                                        FROM cabinet z
                                                                 JOIN device d ON (d.cabinetid_cabinet = c.cabinetid)
                                                        WHERE z.cabinetid = d.cabinetid_cabinet
                                                    ) x
                                           ),
                                           '[]'
                                       ) AS attached_devices
            FROM public.user u
            JOIN cabinet c ON c.userid_user=u.userid
            WHERE u.userid=${uid}
  `,
    );
    console.log("\n\n\n"+JSON.stringify(results))
    return( results )
}

module.exports = {
    getConfigByUser,
    getCabinetConfigsByUser
}