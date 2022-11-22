const { Client } = require('pg');
const sql=require('./configDatabase.m');
var ok=true;
module.exports = {
    create: async () => {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres',
            port: 5432
        });
        const execute = async (query) => {
            try {
                await client.connect();     // gets connection
                for (let i=0;i<query.length;i++) {
                    await client.query(query[i]);  // sends queries
                }
                return true;
            } catch (error) {
                console.error(error.stack);
                return false;
            } finally {
                await client.end();         // closes connection
            }
        };
        var query=[];
        //query.push('DROP DATABASE IF EXISTS "QLBH"');
        query.push('CREATE DATABASE "QLBH"');
        execute(query).then(result => {
            if (result) {
                console.log('Database created');
                sql.exec();
            }
        });
    },
    isExists: async()=>{
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'QLBH',
            password: 'postgres',
            port: 5432
        });
        try {
            await client.connect();
            return true;     // gets connection
        } catch (error) {
            console.error(error.stack);
            return false;
        } finally {
            await client.end();      // closes connection
        }
    },
}