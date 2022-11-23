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
        //console.log(req.session.uid);
        userM.getByUsername(user).then(rs=>{
            //console.log(rs);
            if (rs.length==0) {
                res.render('LogIn',{errWrongPassword:"none",errWrongUsername:"block", username:user.username, password:user.password});
                return false;
            }
            else {
                if (rs[0].f_Password!=user.password) {
                    res.render('LogIn',{errWrongPassword:"block",errWrongUsername:"none", username:user.username, password:user.password});
                    return false;
                }
                req.session.uid=rs[0].f_ID;
                //console.log(req.session.uid, rs[0].f_ID);
                res.redirect('/');
                return true;
            }
        })
    } catch(err) {
        next(err);
    }
};