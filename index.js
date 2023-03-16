const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./Routes/route');
const app = express();

app.use(bodyParser.json({useNewUrlParser:true}));
app.use(bodyParser.urlencoded({extended:true}));



mongoose.connect('mongodb://localhost:27017/patientDb',{
    useNewUrlParser: true
})
.then(()=>{
    console.log("MongoDb is connected...")
})
.catch((error)=>{
    console.log(error);
})

app.use('/',route);


app.listen(3000,()=>{console.log("App is running o port", 3000)});
