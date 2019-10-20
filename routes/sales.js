const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SaleController');
const { check, validationResult } = require('express-validator');
const { checkAuthorize, autorizeByRoles } = require('../JWT/jwt');
const roles = require('../models/rolesModel');
router.get('/',[checkAuthorize,autorizeByRoles([roles.Admin])],async (req,res) => { 
    await saleController.getAllSales(req,res).catch(err => {
        res.status(409,err);
    });
});

router.get('/:id',async (req,res) => { 
    try {
        saleController.getSaleById(req,res)
    }catch(err) {
        res.status(409).send(err);
    }
});

router.post('/',checkAuthorize,(req,res) =>{ 
    try {
     saleController.saveSale(req,res); 
    } catch(err) {
        res.status(409).send(err);
    }
});


module.exports = router;