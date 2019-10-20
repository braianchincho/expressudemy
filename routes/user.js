const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { check, validationResult } = require('express-validator');
const { checkAuthorize, autorizeByRoles } = require('../JWT/jwt');
const roles = require('../models/rolesModel');

router.get('/',
    [ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    async (req,res) => { 
    try {
        await userController.getAllUsers(req,res)
    } catch(err) {
        res.status(409,err);
    }
    
});

router.get('/:id',
    [ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    async (req,res) => { 
    try {
        return await userController.getUserById(req,res)
    }catch(err) {
        res.status(409,err);
    }
});

router.post('/', [ checkAuthorize, autorizeByRoles([roles.Customer]) ] 
    ,(req,res) => { 
    try {
     userController.saveUser(req,res); 
    } catch(err) {
        res.status(409,err);
    }
});

// router.put('/:id',(req,res) => { 
//     try {
//     userController.updateUser(req,res);
//     } catch(err) {
//         res.status(409,err);
//     }
// });

router.delete('/:id',[ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    (req,res) => { 
    userController.deleteUser(req,res).catch( err => {
         res.status(409,err);
    });
});

module.exports = router;