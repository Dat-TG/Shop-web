const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'QLBH',
    user: 'postgres',
    password: 'postgres',
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};
const db = pgp(connection);
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Users"');
        //console.log(rs);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Users"("f_ID","f_Username","f_Password","f_Name","f_Email","f_DOB","f_Permission") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [10, data.username, data.password, data.name, data.email, '2002-10-13 00:00:00', 0]);
        return rs;
    }
}