const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:  { type: String, default: 'Vấn Vip Pro' }, 
    age:{ type: Number, min: 18 },
    address:   String,
    
},{
    timestamps:true
});

module.exports =  mongoose.model('User', userSchema);