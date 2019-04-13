const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RemarkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    last_grade_date: {
        type: Date,
        required: true
    }
});

module.exports = RemarkSchema;