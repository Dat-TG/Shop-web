const userM=require('../model/user.m');
const CryptoJS=require('crypto-js');
const hashLength=64;
exports.render= async(req, res, next) =>{
    try {
        res.render('Register', {display:"none", hideHF:"d-none"});
    } catch(err) {
        next(err);
    }
}
exports.writeDB=async(req, res, next)=>{
    try {
        var user=req.body;
        //console.log(user.username);
        //console.log(user.name);
        //console.log(user.email);
        //console.log(user.password);
        //console.log(user.password_retype);
        //console.log(user.checked);
        //console.log(user.dob);
        const pw=user.password;
        const salt=Date.now().toString(16);
        const pwSalt=user.password+salt;
        const pwHashed=CryptoJS.SHA3(pwSalt, {outputLength:hashLength*4}).toString(CryptoJS.enc.Hex);
        user.password=pwHashed+salt;
        userM.getByUsername(user).then(rs=>{
            if (rs.length==0) {
                userM.add(user);
                res.render('RegisterSuccess',{hideHF:"d-none"});
            }
            else {
                user.password=pw;
                res.render('Register',{data:user, display: "block", hideHF:"d-none"});
            }
        })
    } catch(err) {
        next(err);
    }
};