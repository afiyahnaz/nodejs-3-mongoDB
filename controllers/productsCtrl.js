
const ProductRepository = require('../Repository/productRepository');

//http://locoalhost:3000/api/products/page/1/size/20?sort=brand&dir=desc
//if user passes sort=brand&dir=desc then we should do changes
const getOptions = (req) =>{

        const pageSize = +req.params.size    || 10;  
        const page     = +req.params.page  || 1;

        let sort = req.query.sort;
        const dir = req.query.dir  || '';

        if(!sort){
            sort = 'updatedAt';
            if(!dir){
                dir = 'DESC'
            }
        }
        return  {
            page,
            pageSize,
            sort,
            dir
        };
    };

//http://localhost:3000/api/products/page/1/size/20?sort=brand&dir=DESC
        // console.log(sort,dir,'query params');
        const get = async (req,res) => {
            try{
        const options = getOptions(req);
        const products = await  ProductRepository.get(options);
        const totalRecords = await ProductRepository.getCount();
        const totalPages = Math.ceil(totalRecords/options.pageSize);
        const response ={
            metadata:   {
            totalRecords:totalRecords,
            totalPages: totalPages,  
        },
            data: products,
         };
          res.status(200);
          res.json(response);
    }catch(err) {
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
        req.body.createdAt = new Date();
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
    res.send();
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
            res.send('Internal server error');       
         }   

    };

module.exports = {
    get,
    post,
    getById,
    remove,
    update,
    patch
    
    
};