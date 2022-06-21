const Product = require('../models/productModel');


const get = (options) =>{

    const   { page, pageSize, sort, dir} = options;

    let direction;

    switch(dir.toLowerCase()) {
      case 'asc' :
            direction =1;
            break;
       case 'desc' :  
           direction = -1;
           break ;
       default:
            direction = 1;
            break;

    };
    return Product
    .find({},{_v : 0})
    .sort({ [sort]: direction})
    .skip((page - 1)* pageSize)
    .limit(pageSize);
};

const  getCount = () =>{
    return Product.count();
};

const getById = (id) =>  {
    return Product.findOne({_id : id}, {_v: 0 });
};

const create = (data) => {
    const product = new Product(data);
    return product.save();
};

const remove = (id) =>{
    return  Product.deleteOne({_id:id});
};

const update = (id,data) => {
    return Product.findOneAndUpdate({_id: id},{
        brand:   data.brand,
         model:   data.model,
         price:   data.price,
         instock: data.instock,
         category: data.category,
       
 });
};

const patch = (id, data) => {
  return   Product.findOneAndUpdate({_id:id}, data);


};

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    patch,
    getCount
};