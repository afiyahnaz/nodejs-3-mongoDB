const  mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productSchema = new Schema({
brand : String,
model : String,
price : Number,
instock : Boolean,
category : String
});


module.exports = mongoose.model('product',productSchema);