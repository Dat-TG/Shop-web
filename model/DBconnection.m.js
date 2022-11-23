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
    pgp,
    db
}