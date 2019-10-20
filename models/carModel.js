const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
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