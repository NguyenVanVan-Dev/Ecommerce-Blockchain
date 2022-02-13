const mongoose = require('mongoose');
async function connect(){
    try {
        await  mongoose.connect('mongodb+srv://nguyenvanvan-yone:QyHucO45aM2QJrWQ@cluster0.buxjv.mongodb.net/ecommerce-blockchain?retryWrites=true&w=majority');
        console.log('Connected MongoDB Successfully!');
    } catch (error) {
        console.log('Connected MongoDB failue!');
        console.log(error);
    }

}
module.exports = { connect };