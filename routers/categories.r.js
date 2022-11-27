const catC = require('../controllers/categories.c');
const app = require('express');
const fs = require('fs');
const path = require('path');
const proM = require('../model/product.m');
var proID=0;
proM.proID().then(rs => {
    proID=rs;
    const dir = path.resolve('./public/img/pid/' + rs);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive:true});
    }
});
const router = app.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/pid/'+proID);
    },
    filename: function (req, file, cb) {
        cb(null, "main.jpg");
    }
})
const upload = multer({ storage: storage });
router.post('/:CatID/delete', catC.delete).post(catC.delete);
router.post('/:CatID/edit', catC.edit).post(catC.edit);
router.post('/:CatID/add-product', upload.single('File'), catC.addProduct).post(catC.addProduct);
router.get('/:CatID', catC.render).post(catC.render);
module.exports = router;