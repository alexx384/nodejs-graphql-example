/**
 * https://blog.harveydelaney.com/setting-up-graphql-express-and-postgresql/
 * https://medium.com/@james_mensch/node-js-graphql-postgresql-quickstart-91ffa4374663
 */
const pgPromise = require('pg-promise');

const credent = require('./credentials');

const pgp = pgPromise({});

const config = {
    host: credent.HOST,
    port: credent.PORT,
    database: credent.DB,
    user: credent.USER,
    password: credent.PASSWORD
};

const db = pgp(config);

// Creating table and return none result
db.none('CREATE TABLE users5($1:raw, $2:raw, $3:raw)', [
    'ID serial PRIMARY KEY',
    'username VARCHAR(255)',
    'email VARCHAR(255)'
])
    .then(data => {
        console.log('successfully created');
    })
    .catch(error => {
        console.log(error);
    });

module.exports = db;