const Sequelize = require('sequelize');

const credent = require('./credentials');
const StudentModel = require('./models/student');

const db = new Sequelize(credent.DB, credent.USER, credent.PASSWORD , {
    dialect: 'postgres',
    host: credent.HOST
});

db.authenticate()
.then(() => {
  console.log('Connection to PostgresDB has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the PostgresDB:', err);
});

const Student = db.define('student', StudentModel);

// Delete old table and create new one
db.sync()
.then(() => {
    console.log("The table for PostgresDB is successfully created");
})

module.exports = {
  Student
};