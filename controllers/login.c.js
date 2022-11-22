const nodemon = require('nodemon');
const userM=require('../model/user.m');
exports.render= async(req, res, next) =>{
    try {
        res.render('LogIn',{errWrongPassword:"none",errWrongUsername:"none"});
    } catch(err) {
        next(err);
    }
}
exports.check=async(req, res, next)=>{
    try {
        var user=req.body;
        //console.log(user.username);
        //console.log(user.password);
        var arrUser=await userM.getAll();
        var isExist=false;
        for (let i=0;i<arrUser.length;i++) {
            if (arrUser[i].f_Username===user.username) {
                isExist=true;
                if (arrUser[i].f_Password!=user.password) {
                    res.render('LogIn',{errWrongPassword:"block",errWrongUsername:"none"});
                    return false;
                }
            }
        }
        if (!isExist) {
            res.render('LogIn',{errWrongPassword:"none",errWrongUsername:"block"});
            return false;
        }
        res.render('LogIn',{errWrongPassword:"none",errWrongUsername:"none"});
        return true;
    } catch(err) {
        next(err);
    }
};