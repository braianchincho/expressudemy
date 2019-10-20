const express = require('express');
const router = express.Router();
const userController = require('../controllers/CompanyController');
const { check, validationResult } = require('express-validator');
const { checkAuthorize, autorizeByRoles } = require('../JWT/jwt');
const roles = require('../models/rolesModel');

router.get('/',  [ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    async (req,res) => { 
    try {
        await userController.getAllCompanies(req,res)
    } catch(err) {
        res.status(409,err);
    }
    
});

router.get('/:id',  [ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    async (req,res) => { 
    try {
        await userController.getCompanyById(req,res)
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

router.put('/:id',  [ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,
    async (req,res) => { 
    try {
        await userController.updateCompany(req,res);
    } catch(err) {
        res.status(409).send(err);
    }
});

router.delete('/:id',[ checkAuthorize, autorizeByRoles([roles.Admin]) ] ,async (req,res) => { 
    try {
        await userController.deleteCompany(req,res);
    } catch(err) {
        res.status(409).send(err);
    }
});

module.exports = router;