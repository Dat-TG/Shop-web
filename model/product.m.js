const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Products"');
        return rs;
    },
    getByID: async(ProID)=> {
        const rs=db.any('SELECT * FROM "Products" WHERE "ProID"=$1', [ProID]);
        return rs;
    },
}