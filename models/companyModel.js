const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 99
    },
    country: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const companyModel = mongoose.model('company',companySchema);

module.exports = companyModel;