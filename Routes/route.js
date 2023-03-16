
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const patientController = require('../Controllers/patientController');
const visitController = require('../Controllers/visitController');

//Patient routes- 

router.post('/register',patientController.registerPatient);
router.post('/login',patientController.loginPatient);
router.get('/get',patientController.getAllPatient);
router.get('/get/:patientId',patientController.getPatient);
router.put('/update/:patientId',patientController.updatePatient);
router.delete('/delete/:patientId',patientController.deletePatient);

//Visit route -

router.post('/visit',visitController.visit);



module.exports = router;


