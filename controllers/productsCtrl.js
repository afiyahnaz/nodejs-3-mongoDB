
const ProductRepository = require('../Repository/productRepository');


const get = async (req,res) => {
    try{
          const products = await  ProductRepository.get();
          res.status(200);
          res.json(products);
    }
    catch(err) {
        res.status(500);
        res.send('internal Server Error');
    }
};


//getById.............
//http://localhost:3000/api/products/id
const getById = async(req, res) =>{
    const id = req.params.id;
    const product = await ProductRepository.getById(id);
    res.status(200);
    res.json(product);
};

//POST http://localhost:3000/api/products  body

//index.js -> product router -> product Contrller ->product Repository

const post = async (req, res)=>{
    try{
       await ProductRepository.create(req.body);
         res.status(201);
         res.send();
    } catch (err){
        if(err && err.message.indexOf('validation failed')>-1){
         res.status(400);
         res.send('Bad request');
        } else{
            res.status(500);
            res.send(err);
        }
    }
};

//DELETE http://localhost:3000/api/products/:id
const remove = async (req,res) =>{
    const id = req.params.id;
    await ProductRepository.remove(id);
    res.status(204);
    res.send();
};

//UPDATE http://localhost:3000/api/products/:id
const update = async (req, res) =>{
    const {id} =req.params;
    const {body} = req;
    await ProductRepository.update(id,body);
    res.status(204);
    res.status();
};

    //PATCH http://localhost:3000/api/products/:id  {body}
    const patch = async (req,res) =>{
    const {id} = req.params;
    const {body} = req;
    try{
          await ProductRepository.patch(id, body);
          res.status(204);
          res.send();
        } catch (err){
            res.status(500);
            res.status('Internal server error');        }   

    };

module.exports = {
    get,
    post,
    getById,
    remove,
    update,
    patch
    
    
};