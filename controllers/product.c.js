const catM = require('../model/Categories.m');
const proM = require('../model/product.m');
exports.render=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var ProID=req.params.ProID;
        const data=await proM.getByID(ProID);
        //console.log(data);
        const rs=await catM.getAll();
        var clist = rs.map((item)=>{
            return { CatID:item.CatID, CatName:item.CatName}
        });
        res.render('DetailProduct',{data:data[0],clist:clist});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}