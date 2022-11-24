const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Users"');
        //console.log(rs);
        return rs;
    },
    getByUsername: async(data)=> {
        const rs=db.any('SELECT * FROM "Users" WHERE "f_Username"=$1', [data.username]);
        return rs;
    },
    getByID: async(ID)=>{
        const rs=db.any('SELECT * FROM "Users" WHERE "f_ID"=$1', [ID]);
        return rs;
    },
    add: async(data)=>{
        var f_ID=await db.one('SELECT MAX("f_ID") FROM "Users"');
        f_ID=f_ID.max+1;
        const rs=await db.one('INSERT INTO "Users"("f_ID","f_Username","f_Password","f_Name","f_Email","f_DOB","f_Permission") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [f_ID, data.username, data.password, data.name, data.email, data.dob, 0]);
        return rs;
    }
}