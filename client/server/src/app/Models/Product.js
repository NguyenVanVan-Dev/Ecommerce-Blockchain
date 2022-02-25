const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
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
    },
    price:{
        type:String,
        required:[true,'Please enter price for Product!']
    },
    qty:{
        type:String,
        required:[true,'Please enter quantity for Product!']
    },
    category_id:{
        type: String,
        default: 0,
    },
    image:{
        type:String,
        required:[true,'Please add image for Product!']
    },
    type_display:{
        type:String,
        default:1
    },
},{
    timestamps:true
});

module.exports =  mongoose.model('product', productSchema);