const express = require('express');
const jwt = require('jsonwebtoken');
const patientModel = require('../Models/patientModel');
const visitModel = require('../Models/visitModel');


//Register a user - 

const registerPatient = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please fill the fields" });
        }
        if (!data.fname) {
            return res.status(400).send({ status: false, message: "Please fill the fname field" });
        }
        if (!data.lname) {
            return res.status(400).send({ status: false, message: "Please fill the lname field" });
        }
        if (!data.mobile) {
            return res.status(400).send({ status: false, message: "Please fill the mobile field" });
        }
        if (!data.email) {
            return res.status(400).send({ status: false, message: "Please fill the email field" });
        }
        if (!data.password) {
            return res.status(400).send({ status: false, message: "Please fill the passoword field" });
        }

        const patientData = await patientModel.create(data);
        return res.status(400).send({ status: false, message: "Patient registered", data: patientData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}


//Login a user - 

const loginPatient = async function (req, res) {
    const data = req.body;

    if (!data.email) {
        return res.status(400).send({ status: false, message: "Please give email" })
    }

    if (!data.password) {
        return res.status(400).send({ status: false, message: "Please give password" })
    }

    const validPatient = await patientModel.findOne({ email: data.email, password: data.password }).select({ _id: 1 });
    if (!validPatient) {
        return res.status(400).send({ status: false, message: "Please give valid details" })

    }

    let token = jwt.sign({ patientId: validPatient._id }, "secret-key");

    return res.status(200).send({ status: true, message: "User logged in sucessfull", data: { _id: validPatient._id, token: token } })

}


//To get all patients data (name.email,phone etc.) -

const getAllPatient = async function (req, res) {
    try {
        const patientDetails = await patientModel.find().select({ fname: 1, lname: 1, mobile: 1, email: 1 });
        return res.status(200).send({ status: false, message: "Patient details", data: patientDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}



//To get visit details and investigation(scans,MRI's data etc) for a particular patient  by giving patient Id in params - 

const getPatient = async function (req, res) {
    try {
        
        const patientId = req.params.patientId;
        
        const visitData = await visitModel.find({ patientId: patientId });
        const count = Object.keys(visitData).length;
        const patientData = await patientModel.find({ _id: patientId }).select({ fname: 1, lname: 1, mobile: 1, email: 1 });

      //  const allData = visitData + patientData;
       return  res.json({
            status: true,
            data: { 
                patientData, 
                visitCount :count,
                  visitData
            }
        });
        //return res.status(200).send({ status: true, data: allData })



    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}


//To update the patient details - 

const updatePatient = async function (req, res) {
    try {
        const patientId = req.params.patientId;
        // if(!patientId){
        //     return res.status(400).send({status:false,message:"Please give patientId!"})
        // }

        const validPatient = await patientModel.findById({ _id: patientId });
        if (!validPatient) {
            return res.status(400).send({ status: false, message: "Not a valid patien!" })
        }
        const data = req.body;
        const { fname, lname, mobile, email, password } = data;

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please give data to update!" })
        }

        const updatePatient = await patientModel.findOneAndUpdate({ _id: patientId }, data, { new: true });
        return res.status(200).send({ status: true, message: "Patient updated.", data: updatePatient });



    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}



//To delete the patient details - 

const deletePatient = async function (req, res) {
    try {
        const patientId = req.params.patientId;

        const validPatient = await patientModel.findById({ _id: patientId });
        if (!validPatient) {
            return res.status(400).send({ status: false, message: "Not a valid patien!" })
        }
        const deletePatient = await patientModel.findOneAndUpdate({ _id: patientId });

        return res.status(200).send({ status: true, message: "Patient deleted." })

    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}


module.exports.registerPatient = registerPatient;
module.exports.getAllPatient = getAllPatient;
module.exports.getPatient = getPatient;
module.exports.updatePatient = updatePatient;
module.exports.deletePatient = deletePatient;
module.exports.loginPatient = loginPatient;