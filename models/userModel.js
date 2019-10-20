const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
    },
    isCustomer: Boolean,
    date: {type: Date, default: Date.now()}
});

let userModel;
try {
    userModel = mongoose.model('user',userSchema);
} catch(err) {
    userModel = mongoose.models.user;
}


module.exports = userModel;