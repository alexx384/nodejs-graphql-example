/**
 * https://blog.harveydelaney.com/setting-up-graphql-express-and-postgresql/
 * https://medium.com/@james_mensch/node-js-graphql-postgresql-quickstart-91ffa4374663
 */
const Sequelize = require('sequelize');

const credent = require('./credentials');
const Remark = require('./models/remark');

const db = new Sequelize(credent.DB, credent.USER, credent.PASSWORD , {
    dialect: 'postgres',
    host: credent.HOST
});

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const RemarkModel = db.define('remark', Remark);

// Delete old table and create new one
db.sync({force: true})
.then(() => {
    console.log("The table successfully created");
})

module.exports = {
    RemarkModel
};