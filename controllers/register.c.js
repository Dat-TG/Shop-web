const userM=require('../model/user.m');
exports.render= async(req, res, next) =>{
    try {
        res.render('Register', {display:"none"});
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
        userM.getByUsername(user).then(rs=>{
            if (rs.length==0) {
                userM.add(user);
                res.render('RegisterSuccess');
            }
            else {
                res.render('Register',{data:user, display: "block"});
            }
        })
    } catch(err) {
        next(err);
    }
};