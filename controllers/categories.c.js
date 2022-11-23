const catM=require('../model/Categories.m');
const proM=require('../model/product.m');
exports.render= async(req, res, next) =>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        const rs=await catM.getAll();
        var clist = rs.map((item)=>{
            return { CatID:item.CatID, CatName:item.CatName}
        });
        var CatID=req.params.CatID;
        const rs1=await proM.getByCatID(CatID);
        var plist=rs1.map((item)=>{
            return {ProID:item.ProID, ProName:item.ProName, TinyDes:item.TinyDes, FullDes: item.FullDes, Price:item.Price, CatID:item.CatID, Quantity: item.Quantity};
        });
        var p3list=[];
        while (plist.length>0) {
            p3list.push(plist.splice(0, 3));
        }
        res.render('home',{clist:clist, plist:p3list});
    } catch(err) {
        console.log(err);
        next(err);
    }
}