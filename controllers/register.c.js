exports.render= async(req, res, next) =>{
    try {
        res.render('Register');
    } catch(err) {
        next(err);
    }
}
exports.writeDB=async(req, res, next)=>{
    try {
        var user=req.body;
        console.log(user.name);
        console.log(user.email);
        console.log(user.password);
        console.log(user.password_retype);
        console.log(user.checked);
    } catch(err) {
        enxt(err);
    }
};