const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'QLBH',
    port: 5432
})
module.exports = {
    getAll: async () => {
        await pool.connect();      
        const result = await pool.query({
            rowMode: 'array',
            text: 'SELECT * from Categories',
          })
          console.log(result);
          return result;
    }
};