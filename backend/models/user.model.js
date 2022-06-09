const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    tasks:{ 
        type : Array , 
        "default" : []
    }
    
});

//it will make a collection 'users'
module.exports = mongoose.model("User", userSchema);