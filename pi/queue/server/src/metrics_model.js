server_db = require('./server_db')
const pool = server_db.getPool()

const endPool = () => {
    pool.end()
}

const zeroForUndefined = (x) => {
    if(typeof(x) === "number") {
        return(x)
    }
    return(0)
}

const aggregate = (agg,language,row) => {
    if (agg.init === false ) {
        agg = JSON.parse(JSON.stringify( row ));
        agg.init = true
        agg.language = language
        agg["successcount"] = zeroForUndefined(row["successcount"])
        agg["successpercent"] = zeroForUndefined(row["successpercent"])
        agg["crashcount"] = zeroForUndefined(row["crashcount"])
        agg["untestedcount"] = zeroForUndefined(row["untestedcount"])
        agg["runcount"] = zeroForUndefined(row["runcount"])
        agg["testedcount"] = zeroForUndefined(row["testedcount"])
        if(language === "__TOTAL__"){
            agg["successpercent"] =(agg["successcount"] * 100) / agg["testedcount"]
            agg["successpercent"] = Number(agg["successpercent"].toLocaleString(
                undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1, minimumIntegerDigits: 2 }));
        }
    } else {
        agg["testedcount"] = agg.testedcount + zeroForUndefined(row["testedcount"])
        agg["runcount"] = agg["runcount"] + zeroForUndefined(row["runcount"])
        agg["untestedcount"] = agg["untestedcount"]+zeroForUndefined(row["untestedcount"])
        agg["successcount"] = agg["successcount"]+zeroForUndefined(row["successcount"])
        agg["crashcount"] = agg["crashcount"]+zeroForUndefined(row["crashcount"])
        agg["successpercent"] = (agg["successcount"] * 100) / agg["testedcount"]
        agg["successpercent"] = Number(agg["successpercent"].toLocaleString(
            undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1, minimumIntegerDigits: 2 }));
        agg["total"] = agg["total"]+zeroForUndefined(row["total"])
    }
    return(agg)
}

const assembleAll = ( zzz ) => {
    let java = {init: false}
    let go = {init: false}
    let python = {init: false}
    let rust = {init: false}
    let node = {init: false}
    let total = {init: false}

    for (row in zzz) {
        if (zzz[row]["language"].includes("java|") || zzz[row]["language"] === "java") {
            java = JSON.parse(JSON.stringify(aggregate(java, "java", zzz[row])))
        }
        if (zzz[row]["language"].includes("go|") || zzz[row]["language"] === "go") {
            go = JSON.parse(JSON.stringify(aggregate(go, "go", zzz[row])))
        }
        if (zzz[row]["language"].includes("python|") || zzz[row]["language"] === "python") {
            python = JSON.parse(JSON.stringify(aggregate(python, "python", zzz[row])))
        }
        if (zzz[row]["language"].includes("rust|") || zzz[row]["language"] === "rust") {
            rust = JSON.parse(JSON.stringify(aggregate(rust, "rust", zzz[row])))
        }
        if (zzz[row]["language"].includes("node|") || zzz[row]["language"] === "node") {
            node = JSON.parse(JSON.stringify(aggregate(node, "node", zzz[row])))
        }
        if (zzz[row]["language"] === "__TOTAL__") {
            total = JSON.parse(JSON.stringify(aggregate(total, "__TOTAL__", zzz[row])))
        }
    }
    let xx = []
    if (go.init) {
        xx.push(go)
    }
    if (java.init) {
        xx.push(java)
    }
    if (node.init) {
        xx.push(node)
    }
    if (python.init) {
        xx.push(python)
    }
    if (rust.init) {
        xx.push(rust)
    }
    xx.push(total)
    return (xx)
}

const getAllMetrics = (id) => {
    console.log("metrics_model getAllMetrics")
    return new Promise(function (resolve, reject) {
        all = []
        var ssql = "select language, count(*) as testedcount from buildableproject where language is not null AND language not like 'STUCK%' AND subprojectname = '' AND buildableprojectid in (select buildableprojectid from testrun where result = 'success' or result = 'fails') group by language"
        pool.query(ssql, (error, results) => {
                if (error) {
                    reject(error)
                }
//                all = results.rows
                if (results) {
                    addFieldValue(all, results, "language", "testedcount")
                    var ssql = "select language, count(*) as runcount from testrun t join buildableproject b on b.buildableprojectid = t.buildableprojectid group by language"
                    pool.query(ssql, (error, results) => {
                        if (error) {
                            reject(error)
                        }
                        if (results) {
                            addFieldValue(all, results, "language", "runcount")
                            var ssql = "select language, count(*) as crashcount from buildableproject where language is not null AND language not like 'STUCK%' AND subprojectname = '' AND buildableprojectid in (select buildableprojectid from testrun where result = 'in-progress' ) group by language"
                            pool.query(ssql, (error, results) => {
                                if (error) {
                                    reject(error)
                                }
                                if( results ) {
                                    addFieldValue(all, results, "language", "crashcount")
                                    var ssql = "select language, count(*) as untestedcount from buildableproject where language is not null AND subprojectname = '' AND language not like 'STUCK%' AND buildableprojectid not in (select buildableprojectid from testrun where result = 'success' or result = 'fails') group by language"
                                    pool.query(ssql, (error, results) => {
                                            if (error) {
                                                reject(error)
                                            }
                                            if (results) {
                                                addFieldValueWithTotal(all, results, "language", "untestedcount")
//                    console.log("all = " + all)
                                                var ssql =
                                                    "select language, count(*) as successcount " +
                                                    " from buildableproject where language is not null AND buildableprojectid in " +
                                                    " (select distinct t.buildableprojectid from testrun t join buildableproject b on b.buildableprojectid = t.buildableprojectid " +
                                                    " where result='success' and b.subprojectname='') group by language"
                                                pool.query(ssql, (error, results) => {
                                                        if (error) {
                                                            reject(error)
                                                        }
                                                        if (results) {
                                                            addFieldValueWithPercent(all, results, "language", "successcount")
//                        console.log("all = " + all)
                                                            tested = 0
                                                            untested = 0
                                                            succeeded = 0
                                                            crashed = 0
                                                            runs = 0
                                                            for (row in all) {
                                                                if (all[row]["testedcount"]) {
                                                                    tested = tested + Number(all[row]["testedcount"])
                                                                }
                                                                if (all[row]["successcount"]) {
                                                                    succeeded = succeeded + Number(all[row]["successcount"])
                                                                }
                                                                if (all[row]["untestedcount"]) {
                                                                    untested = untested + Number(all[row]["untestedcount"])
                                                                }
                                                                if (all[row]["crashcount"]) {
                                                                    crashed = crashed + Number(all[row]["crashcount"])
                                                                }
                                                                if (all[row]["runcount"]) {
                                                                    runs = runs + Number(all[row]["runcount"])
                                                                }
                                                            }
                                                            r = {}
                                                            r["language"] = "__TOTAL__"
                                                            r["successpercent"] = (succeeded * 100) / tested
                                                            r["successpercent"] = r["successpercent"].toLocaleString(
                                                                undefined,                                                                {
                                                                    minimumFractionDigits: 1,
                                                                    maximumFractionDigits: 1,
                                                                    minimumIntegerDigits: 2
                                                                })
                                                            r["runcount"] = runs
                                                            r["crashcount"] = crashed
                                                            r["testedcount"] = tested
                                                            r["untestedcount"] = untested
                                                            r["successcount"] = succeeded
                                                            r["total"] = tested + untested
                                                            all.push(r)
                                                            xx = assembleAll(all)
                                                            resolve(xx)
                                                        } else {
                                                            resolve({results: []});
                                                        }
                                                    }
                                                )
                                            } else {
                                                resolve({results: []});
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    })
                } else {
                    resolve({results: []});
                }
            }
        )
    })
}

const addFieldValueWithTotal = (bigarray,results,keyfieldname, newfieldname) => {
    found = false
    for( newrow in results.rows ) {
        for (row in bigarray) {
            if( !bigarray[row]["total"]) {
                bigarray[row]["total"] = Number(bigarray[row]["testedcount"])
            }
            if (bigarray[row][keyfieldname] === results.rows[newrow][keyfieldname]) {
//                console.log("found " + bigarray[row][newfieldname])
                bigarray[row][newfieldname] = Number(results.rows[newrow][newfieldname])
//                console.log("total is " + Number(bigarray[row]["testedcount"]))
                bigarray[row]["total"] = Number(bigarray[row]["testedcount"]) + Number(bigarray[row][newfieldname])
                found = true;
                break;
            }
        }
        if( !found ) {
            results.rows[newrow]["untestedcount"] = 0
            results.rows[newrow]["total"] = Number(bigarray[row]["testedcount"])
            bigarray.push(results.rows[newrow])
        }
    }
}

const addFieldValueWithPercent = (bigarray,results,keyfieldname, newfieldname) => {
    found = false
    for( newrow in results.rows ) {
        for (row in bigarray) {
            if (bigarray[row][keyfieldname] === results.rows[newrow][keyfieldname]) {
//               console.log("found " + bigarray[row][keyfieldname])
                bigarray[row][newfieldname] = Number(results.rows[newrow][newfieldname])
//                console.log("percent is " + Number(bigarray[row]["testedcount"]))
                bigarray[row]["successpercent"] = (Number(bigarray[row][newfieldname])*100)/(Number(bigarray[row]["testedcount"]))
                bigarray[row]["successpercent"] = Number(bigarray[row]["successpercent"].toLocaleString(
                    undefined, // leave undefined to use the browser's locale,
                    // or use a string like 'en-US' to override it.
                    { minimumFractionDigits: 1, maximumFractionDigits: 1, minimumIntegerDigits: 2 }
                ));
                found = true;
                break;
            }
        }
        if( !found ) {
            bigarray.push(results.rows[newrow])
        }
    }
}


const addFieldValue = (bigarray,results,keyfieldname, newfieldname) => {
    found = false
    for( newrow in results.rows ) {
        for (row in bigarray) {
            if (bigarray[row][keyfieldname] === results.rows[newrow][keyfieldname]) {
                //               console.log("found " + bigarray[row][newfieldname])
                bigarray[row][newfieldname] = Number(results.rows[newrow][newfieldname])
                found = true;
                break;
            }
        }
        if( !found ) {
            results.rows[newrow][newfieldname] = Number(results.rows[newrow][newfieldname])
            bigarray.push(results.rows[newrow])
        }
    }
}

module.exports = {
    endPool: endPool,
    getAllMetrics: getAllMetrics,
}