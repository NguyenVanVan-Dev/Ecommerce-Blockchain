const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { 
        type: String, 
        default: 'Vấn Vip Pro',
        required:true 
    }, 
    phone:{ 
        type: String,
        min: 9,
        required:true 
    },
    email:{
        type: String,
        max:255,
        required:true 
    },
    password:{
        type:String,
        min:8,
        required:true 
    }
    
},{
    timestamps:true
});

module.exports =  mongoose.model('User', userSchema);