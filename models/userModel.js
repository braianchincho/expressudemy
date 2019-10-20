const mongoose = require('mongoose');
const roles = require('./rolesModel') ;
console.log(roles)
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(roles)
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