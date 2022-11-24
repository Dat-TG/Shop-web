const userM=require('../model/user.m');
exports.render=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        const rs=await userM.getByID(req.session.uid);
        res.render('profile',{u:rs[0]});
    } catch(err) {
        next(err);
    }
}