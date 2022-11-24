const userM=require('../model/user.m');
const catM=require('../model/Categories.m');
exports.render=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        const rs2=await userM.getByID(req.session.uid);
        const rs=await catM.getAll();
        var clist = rs.map((item)=>{
            return { CatID:item.CatID, CatName:item.CatName}
        });
        res.render('profile',{u:rs2[0], clist:clist});
    } catch(err) {
        next(err);
    }
}