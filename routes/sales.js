const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SaleController');
const { check, validationResult } = require('express-validator');

router.get('/',async (req,res) => { 
    try {
        await saleController.getAllSales(req,res)
    } catch(err) {
        res.status(409,err);
    }
    
});

router.get('/:id',async (req,res) => { 
    try {
        saleController.getSaleById(req,res)
    }catch(err) {
        res.status(409).send(err);
    }
});

router.post('/',(req,res) =>{ 
    try {
     saleController.saveSale(req,res); 
    } catch(err) {
        res.status(409).send(err);
    }
});


module.exports = router;