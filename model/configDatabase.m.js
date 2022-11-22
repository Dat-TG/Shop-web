const fs = require('fs');
const { Client } = require('pg');
const sqlPath='./model/QLBH_postgre.sql';
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'QLBH',
    password: 'postgres',
    port: 5432
});


module.exports = {
    exec: async () => {
        try {
            await client.connect();
            sql=fs.readFileSync(sqlPath, "utf-8");
            await client.query(sql);
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        } finally {
            await client.end();         // closes connection
        }
    }
}