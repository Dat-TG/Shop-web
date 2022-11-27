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
    getByCatID: async(CatID) => {
        const rs=db.any('SELECT * FROM "Products" WHERE "CatID"=$1', [CatID]);
        return rs;
    },
    add: async (CatID, data) => {
        var proID = await db.one('SELECT MAX("ProID") FROM "Products"');
        proID = proID.max + 1;
        const rs = db.one('INSERT INTO "Products"("ProID","ProName","TinyDes","FullDes","Price","CatID","Quantity") VALUES($1, $2,$3,$4,$5,$6,$7) RETURNING *', [proID, data.proName, data.proTinyDes, data.proFullDes, data.proPrice, CatID, data.proQuantity]);
        return rs;
    },
    proID: async()=>{
        var proID = await db.one('SELECT MAX("ProID") FROM "Products"');
        proID = proID.max + 1;
        return proID;
    },
}