const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    qty: {
        type: Number
    }
});

module.exports = ProductSchema;