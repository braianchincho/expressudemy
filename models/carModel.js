const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 2,
        maxlength: 99
    },
    model: String,
    price: {
        type: Number,
        required: true
    },
    year: {
        type:Number,
        min: 1960,
        max: (new Date()).getFullYear()
    },
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now()}
});

const carModel = mongoose.model('cars',carSchema);

module.exports = carModel;