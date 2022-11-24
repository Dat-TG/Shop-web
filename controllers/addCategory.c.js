const catM=require('../model/Categories.m');
exports.add=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        catM.add(req.body.CatName).then(()=>{
            setTimeout(function(){
                res.redirect('/');},3000);
        });
    }
    catch(err) {
        next(err);
    }
}