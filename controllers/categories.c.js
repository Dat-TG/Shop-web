const catM=require('../model/Categories.m');
const proM=require('../model/product.m');
exports.render= async(req, res, next) =>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var CatID=req.params.CatID;
        var CatName="";
        const rs=await catM.getAll();
        var clist = rs.map((item)=>{
            if (CatName=="" && item.CatID==CatID) {
                CatName=item.CatName;
            }
            return { CatID:item.CatID, CatName:item.CatName}
        });
        const rs1=await proM.getByCatID(CatID);
        var plist=rs1.map((item)=>{
            return {ProID:item.ProID, ProName:item.ProName, TinyDes:item.TinyDes, FullDes: item.FullDes, Price:item.Price, CatID:item.CatID, Quantity: item.Quantity};
        });
        var p3list=[];
        while (plist.length>0) {
            p3list.push(plist.splice(0, 3));
        }
        res.render('home',{clist:clist, plist:p3list, CatName:CatName, btn_display:"inline", CatID:CatID});
    } catch(err) {
        console.log(err);
        next(err);
    }
}
exports.delete=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var CatID=req.params.CatID;
        catM.delete(CatID).then(()=>{
            setTimeout(function(){
                res.redirect('/');},3000);
        });
    }
    catch(err) {
        next(err);
    }
}
exports.edit=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        var CatID=req.params.CatID;
        var CatName=req.body.CatName;
        catM.update(CatID, CatName).then(()=>{
            setTimeout(function(){
                res.redirect('/Categories/'+CatID);},3000);
        });
    }
    catch(err) {
        next(err);
    }
}
exports.addProduct=async(req,res,next)=>{
    if (!req.session.uid) {
        res.redirect('/login');
        return false;
    }
    try {
        //console.log(req.file);
        var CatID=req.params.CatID;
        var data=req.body;
        //console.log(data);
        proM.add(CatID, data).then(()=>{
            setTimeout(function(){
                res.redirect('/Categories/'+CatID);},3000);
        });
    }
    catch(err) {
        next(err);
    }
}