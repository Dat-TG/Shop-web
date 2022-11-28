const app=require('express');
const router=app.Router();
const productC=require('../controllers/product.c');
router.post('/:ProID/edit',productC.edit).post(productC.edit);
router.post('/:ProID/delete',productC.delete).post(productC.delete);
router.use('/:ProID', productC.render).post(productC.render);
module.exports=router;