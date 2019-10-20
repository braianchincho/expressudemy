const express = require('express');
const router = express.Router();
const userController = require('../controllers/CompanyController');
const { check, validationResult } = require('express-validator');

router.get('/',async (req,res) => { 
    try {
        await userController.getAllCompanies(req,res)
    } catch(err) {
        res.status(409,err);
    }
    
});

router.get('/:id',async (req,res) => { 
    try {
        userController.getCompanyById(req,res)
    }catch(err) {
        res.status(409).send(err);
    }
});

router.post('/',(req,res) =>{ 
    try {
     userController.saveCompany(req,res); 
    } catch(err) {
        res.status(409).send(err);
    }
});

router.put('/:id',(req,res) => { 
    try {
    userController.updateCompany(req,res);
    } catch(err) {
        res.status(409).send(err);
    }
});

router.delete('/:id',(req,res) => { 
    try {
    userController.deleteCompany(req,res);
    } catch(err) {
        res.status(409).send(err);
    }
});

module.exports = router;