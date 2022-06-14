const express = require('express');

//installed registration...........
const mongoose = require('mongoose');


//............my files registration...........
const homeRouter = require('./routes/homeRouter');
const productsRouter =require('./routes/productsRouter');
const  config = require('./config/index');
const app = express();


const PORT =3000;
app.listen(PORT,() =>{
    console.log(`sever is running on  ${PORT}`);  

});


mongoose.connect(config.bdConstr, (err,result) =>{
     if(!err)    console.log('connected to db');
      else       console.log(err);
});



app.use('/',homeRouter);
app.use('/api/products', productsRouter);