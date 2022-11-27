const app=require('express');
const router=app.Router();
const productC=require('../controllers/product.c');
router.use('/:ProID', productC.render).post(productC.render);
module.exports=router;