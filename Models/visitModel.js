const mongoose = require('mongoose');


const vistSchema = new mongoose.Schema({
  patientId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  date:{ type: Date, default: Date.now },
  Concerns : {
      type:String,
  },
  scans : {
      type:String,
  },
  totalCost : {
      type:String,
  },
  
        
},{timestamps:true});

module.exports = mongoose.model('visit',vistSchema);