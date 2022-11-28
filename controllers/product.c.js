const catM = require('../model/Categories.m');
const proM = require('../model/product.m');
const fs = require('fs');
const path = require('path');
exports.render = async (req, res, next) => {
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var ProID = req.params.ProID;
        const data = await proM.getByID(ProID);
        //console.log(ProID);
        //console.log(data);
        const Cat = await catM.getByID(data[0].CatID);
        data[0].Category = Cat[0].CatName;
        const rs = await catM.getAll();
        var clist = rs.map((item) => {
            return { CatID: item.CatID, CatName: item.CatName }
        });

        res.render('DetailProduct', { data: data[0], clist: clist, cclist: clist.filter(function (item) { return item.CatID != data[0].CatID; }) });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}
exports.edit = async (req, res, next) => {
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var ProID = req.params.ProID;
        const dir = path.resolve('./public/img/pid/' + ProID);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const multer = require("multer");
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/img/pid/' + ProID);
            },
            filename: function (req, file, cb) {
                cb(null, "main.jpg");
            }
        })
        const upload = multer({ storage: storage }).single('FileE');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err);
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log(err);
            }
            // Everything went fine.
            var data = req.body;
            proM.update(ProID, data).then(() => {
                setTimeout(function () {
                    res.redirect('/product/' + ProID);
                }, 3000);
            });
        })
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}
exports.delete = async (req, res, next) => {
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var ProID = req.params.ProID;
        proM.delete(ProID).then(() => {
            setTimeout(function () {
                res.redirect('/');
            }, 3000);
        });
    }
    catch (err) {
        next(err);
    }
}