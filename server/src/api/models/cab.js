const {sql} = require('@databases/pg');
const db = require('./database');

function nestQuery(query) {
    return sql`
     (SELECT array_to_json(array_agg(row_to_json(x))) FROM (${query}) x )`;
}

function nestQuerySingle(query) {
    return sql`
    (SELECT row_to_json(x) FROM (${query}) x)
  `;
}

async function getConfigByUser(uid) {
    const results = await db.query(
        sql`
            SELECT
                u.userid AS userid,
                u.email,
                c.cabinetid AS cabinetid,
                ${nestQuery(
                        sql`
                            SELECT c.cabinetid, m.userid AS id, m.email
                            FROM public.user m
                            JOIN cabinet c on c.userid_user = m.userid
                            WHERE m.userid = ${uid}
                        `
                )} AS cabi,
                coalesce(
                        (
                            SELECT array_to_json(array_agg(row_to_json(x)))
                            FROM (
                                     SELECT c.cabinetid AS cabinetid, d.deviceid AS deviceid,
                                            coalesce((
                                                    SELECT array_to_json(array_agg(row_to_json(y)))
                                                    FROM (
                                                        SELECT moduleid, module_name, container_name, module_type, i2caddress, protocol 
                                                        from module n where n.deviceid_device = d.deviceid
                                                    ) y )
                                                 , '[]') as modules

                                    FROM cabinet z
                                     JOIN device d ON (d.cabinetid_cabinet=c.cabinetid)
                                     WHERE z.cabinetid = d.cabinetid_cabinet
                                 ) x
                        ),
                        '[]'
                    ) AS devices
            FROM public.user u
            JOIN cabinet c ON c.userid_user=u.userid
            WHERE u.userid=${uid}
  `,
    );
    return( results )
}

module.exports = {
    getConfigByUser
}