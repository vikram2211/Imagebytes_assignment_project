const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fname: {type : String,required:true},
    lname: {type : String,required:true},
    mobile: {type : Number,required:true},
    email: {type : String,required:true},
    password: {type : String,required:true},
   
},{timestamps:true});

module.exports = mongoose.model('patient',patientSchema);