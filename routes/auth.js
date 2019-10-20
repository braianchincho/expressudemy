const express = require('express');
const router = express.Router();
const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { createToken } = require('../JWT/jwt');
router.post('/', [
    check('email').isEmail(),
    check('password').isLength({min: 4})
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = await userModel.findOne({
        email: req.body.email});
    if (!user) {
        return res.status(404).send('Usuario o contraseña incorrecto');
    }
    const validPassword = await bcrypt.
        compare(req.body.password,user.password);
    if(validPassword) {
       return res.status(200).send(createToken(user));
    } else {
       return res.status(404).send('Usuario o contraseña incorrecto');
    }
});


module.exports = router;