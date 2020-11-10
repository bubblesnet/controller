var express = require('express');
var router = express.Router();
const metrics_model = require('../models/icebreaker/metrics_model')
const sbc_model = require('../models/icebreaker/sbc_model')
const testrun_model = require('../models/icebreaker/testrun_model')
const testqueue_model = require('../models/icebreaker/testqueue_model')

router.put('/project/retest/:id', (req, res) => {
    console.log("put /project/retest/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    testqueue_model.clearRetest(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.get('/metrics/all', (req, res) => {
    metrics_model.getAllMetrics()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

/// TODO - this seems incompatible with above - should be deprecated
router.get('/:id', (req, res) => {
    console.log("getDeviceStatus")
    devicestatus_model.getDeviceStatus(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.put('/sbc/:id', (req, res) => {
    console.log("put /sbc/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    sbc_model.updateSbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.put('/sbc/', (req, res) => {
    console.log("put /sbc params " + JSON.stringify(req.params))
    sbc_model.createEmptySbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.delete('/sbc/:id', (req, res) => {
    console.log("delete "+req.params.id)
    sbc_model.deleteSbc(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.get('/sbc/all', (req, res) => {
    sbc_model.getSbcs()
        .then(response => {
//            console.log(response)
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.get('/testruns', (req, res) => {
    testrun_model.getTestRuns()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.get('/testqueue/:language', (req, res) => {
    testqueue_model.getAll(req.params.language)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
})

router.post('/testruns/retest', (req, res) => {
    testrun_model.retestTestRun(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.delete('/testruns/:id', (req, res) => {
    testrun_model.deleteMerchant(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

module.exports = router;