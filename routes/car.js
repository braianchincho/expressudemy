const carController = require('../controllers/CarController');
const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { checkAuthorize, autorizeByRoles } = require('../JWT/jwt');
const roles = require('../models/rolesModel');

router.get('/', [ checkAuthorize, autorizeByRoles([roles.Admin,roles.Customer]) ] ,
    async (req, res)=>{
    try {
       const cars = await carController.getAllCars();
       return res.send(cars);
    } catch(err) {
        return res.status(404).send('Autos no encontrados')
    }
});

router.get('/:id', [ checkAuthorize, autorizeByRoles([roles.Admin,roles.Customer]) ] ,
   async(req, res)=>{
   try {
       const car = await carController.getCarById(req.params.id);
       return res.send(car);
   } catch (err){
       res.status(404).send('Auto no encontrado');
   }
});
router.post('/', [
    check('model').isString(),
    check('price').isNumeric(),
    check('year').isNumeric(),
    checkAuthorize , 
    autorizeByRoles([roles.Admin]) 
],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const result = await carController.saveCar(req.body);
        return res.status(201).send(result);
    } catch(err) {
        return res.status(409).send('Error al registrar');
    }


});
router.put('/:id', [
    check('company').isLength({min: 3}),
    check('model').isString(),
    check('price').isNumeric(),
    check('year').isNumeric(),
    checkAuthorize, 
    autorizeByRoles([roles.Admin]) 
],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
      const car = await carController.updateCar(req.params.id,req.body);
      return res.status(204).send(car);
    } catch(err) {
      return res.status(409).send('Error al actualizar');
    }
    
});


router.delete('/:id', [ checkAuthorize, autorizeByRoles([roles.Admin]) ] , async(req, res)=>{
    try {
        const coche = await carController.deleteCar(req.params.id);
        return res.status(200).send(coche)
    } catch(err) {
       return res.status(409).send('Error al borrar')
    }
});

module.exports = router;