const catM=require('../model/Categories.m');
exports.render= async(req, res, next) =>{
    try {
        const rs=await catM.getAll();
        var list = rs.map((item)=>{
            return { CatID:item.CatID, CatName:item.CatName}
        });
       // console.log(list);
        res.render('home',{data:list});
    } catch(err) {
        console.log(err);
        next(err);
    }
}