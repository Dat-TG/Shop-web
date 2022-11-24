const catC=require('../controllers/categories.c');
const app=require('express');
const router=app.Router();
router.post('/:CatID/delete',catC.delete).post(catC.delete);
router.get('/:CatID',catC.render).post(catC.render);
module.exports=router;