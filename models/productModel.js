const  mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productSchema = new Schema({
brand :{ type :String, required: [true, 'Brand is mandatory'], minLength:[3,'Min.3 characters'],
maxLength:[10,'10 characters']},
model : { type :String, required: [true, 'Model is mandatory']},
price : { type :Number, required: [true, 'Price is mandatory']},
instock :{ type :Boolean, default:false},
category : {type : String ,required: [true, 'category is mandatory']},
discount :{type : Number, default:0},
});


module.exports = mongoose.model('product',productSchema);