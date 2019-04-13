const mongoose = require('mongoose');

const credent = require('./credentials');
const RemarkSchema = require('./models/remark');

/*
===== Setup connection to MongoDB =====
*/
const connection = mongoose.createConnection(
    `mongodb://${credent.USER}:${credent.PASSWORD}@${credent.HOST}/${credent.DB}?authSource=admin`,
);

/*
===== Register mongoose callbacks =====
*/
connection.on('connected', () => {
    console.log(`Successfully connected to MongoDB`);
});

connection.on('error', (err) => {
    console.log(`Error during establish connection to MongoDB`);
});

/*
Create models and export them
*/
Remark = connection.model('remark', RemarkSchema);

module.exports = {
    Remark
};