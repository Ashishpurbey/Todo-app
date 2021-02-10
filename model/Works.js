//require the library
const mongoose = require('mongoose');

//set the schema to store data in database
const workSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

const Work = mongoose.model('Work',workSchema);

module.exports = Work;