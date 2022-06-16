const express = require('express');
const productsCtrl = require('../controllers/productsCtrl');

const router = express.Router();


//http://locoalhost:3000/api/products
router.get('/',productsCtrl.get);
//http://localhost:3000/api/products/1425544ggsgh
router.get('/:id',productsCtrl.getById);

router.post('/',productsCtrl.post);
router.delete('/:id',productsCtrl.remove);
router.put('/:id',productsCtrl.update);



module.exports = router;