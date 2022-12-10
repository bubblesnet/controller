const express = require('express')
const app = express()
const port = process.env.PORT

const testrun_model = require('./testrun_model')
const devicestatus_model = require('./devicestatus_model')
const metrics_model = require('./metrics_model')
const sbc_model = require('./sbc_model')
const testqueue_model = require('./testqueue_model')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/devicestatus/:id', (req, res) => {
    console.log("getDeviceStatus")
    devicestatus_model.getDeviceStatus(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/metrics/all', (req, res) => {
    metrics_model.getAllMetrics()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/sbc/all', (req, res) => {
    sbc_model.getSbcs()
        .then(response => {
//            console.log(response)
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/testruns', (req, res) => {
    testrun_model.getTestRuns()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/testqueue/:language', (req, res) => {
    testqueue_model.getAll(req.params.language)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
})

app.put('/sbc/', (req, res) => {
    console.log("put /sbc params " + JSON.stringify(req.params))
    sbc_model.createEmptySbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/sbc/:id', (req, res) => {
    console.log("put /sbc/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    sbc_model.updateSbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/project/retest/:id', (req, res) => {
    console.log("put /project/retest/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    testqueue_model.clearRetest(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/testruns/retest', (req, res) => {
    testrun_model.retestTestRun(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/sbc/:id', (req, res) => {
    console.log("delete "+req.params.id)
    sbc_model.deleteSbc(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/testruns/:id', (req, res) => {
    testrun_model.deleteMerchant(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})