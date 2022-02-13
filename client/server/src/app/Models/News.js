const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newSchema = new Schema({
    title:  { type: String, default: 'Vấn Vip Pro' }, 
    content:{ type: String },
},{
    timestamps:true
});

module.exports =  mongoose.model('New', newSchema);