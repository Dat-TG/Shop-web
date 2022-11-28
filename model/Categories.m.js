const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Categories"');
        return rs;
    },
    getByID: async(CatID)=> {
        const rs=db.any('SELECT * FROM "Categories" WHERE "CatID"=$1', [CatID]);
        return rs;
    },
    add: async(CatName)=>{
        var CatID=await db.one('SELECT MAX("CatID") FROM "Categories"');
        CatID=CatID.max+1;
        const rs=await db.one('INSERT INTO "Categories"("CatID","CatName") VALUES($1, $2) RETURNING *', [CatID, CatName]);
        return rs;
    },
    delete: async(CatID) => {
        const rs=await db.any('DELETE FROM "Categories" WHERE "CatID"=$1', [CatID]);
        return rs;
    },
    update: async(CatID, CatName) => {
        const rs=await db.none('UPDATE "Categories" SET "CatName"=$1 WHERE "CatID"=$2', [CatName, CatID]);
        return rs;
    }
}