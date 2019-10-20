const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { check, validationResult } = require('express-validator');

router.get('/',async (req,res) => { 
    try {
        await userController.getAllUsers(req,res)
    } catch(err) {
        res.status(409,err);
    }
    
});

router.get('/:id',async (req,res) => { 
    // try {
        userController.getUserById(req,res)
    // }catch(err) {
    //     res.status(409,err);
    // }
});

router.post('/',(req,res) =>{ 
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

router.delete('/:id',(req,res) => { 
    try {
    userController.deleteUser(req,res);
    } catch(err) {
        res.status(409,err);
    }
});

module.exports = router;