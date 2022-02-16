const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { 
        type: String, 
        default: 'Vấn Vip Pro',
        required:[true , 'Please enter your name!' ]
    }, 
    phone:{ 
        type: Number,
        min: [10,'invalid phone number'],
        required:[true , 'Please enter your phone number !' ]
    },
    email:{
        type: String,
        max:255,
        unique: true,
        required:[true , 'Please enter your email account!' ]
    },
    password:{
        type:String,
        min:[8, 'Please enter a password longer than 8 characters!'],
        required:[true , 'Please enter your password!' ]
    }
    
},{
    timestamps:true
});

module.exports =  mongoose.model('User', userSchema);