const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: { 
        type: String, 
        required:[true , 'Please enter your name!' ]
    }, 
    desc:{
        type: String,
        max:255,
        required:[true , 'Please enter your desciption!' ]
    },
    keyword:{
        type:String,
        required:[true , 'Please enter your keyword!' ]
    },
    display:{
        type:String,
        default: 0,
    },
    slug:{
        type:String,
        required:[true , 'Please enter your slug!' ]
    }
    
},{
    timestamps:true
});

module.exports =  mongoose.model('category', categorySchema);