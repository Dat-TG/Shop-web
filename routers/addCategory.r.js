const addCatC=require('../controllers/addCategory.c');
const app=require('express');
const router=app.Router();
router.post('/',addCatC.add);
module.exports=router;