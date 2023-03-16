const mongoose = require('mongoose');
const visitModel = require('../Models/visitModel');


//Visit details and other details like scans and MRI's - 

const visit = async function (req, res) {
    const data = req.body;

    if (!data.patientId) {
        return res.status(400).send({
            status: false, message: "Please give patientId!"
        })
    }
    if (!data.Concerns) {
        return res.status(400).send({
            status: false, message: "Please give concerns!"
        })
    }
    if (!data.scans) {
        return res.status(400).send({
            status: false, message: "Please give scans!"
        })
    }
    if (!data.totalCost) {
        return res.status(400).send({
            status: false, message: "Please give totalCost!"
        })
    }

    const visitData = await visitModel.create(data);
    return res.status(400).send({
        status: false, message: "visit details", data: visitData
    })

}

module.exports.visit = visit;