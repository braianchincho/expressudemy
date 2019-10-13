const mongosee = require('mongoose');
const carModel = require('../models/carModel')
const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/',async (req, res)=>{
   const cars = await carModel.find();
   res.send(cars);
})

router.get('/:id',async(req, res)=>{
   const car = await carModel.findById(req.params.id);
   if(car) {
       return res.send(car);
   } else {
       res.status(404).res('No se encontro el auto');
   }
  
})

// router.get('/:company/:model',(req, res)=>{
//     res.send(req.params)
// })

// router.get('/', (req, res)=> {
//     res.send(coches)
// })

// router.get('/:company', (req, res)=>{
//     const coche = coches.find(coche => coche.company === req.params.company)

//     if(!coche){
//         res.status(404).send('No tenemos ningun coche de esa marca')
//     }else{
//         res.send(coche)
//     }
// })

// router.post('/', (req, res)=>{
//     var carId = coches.length;
//     var coche ={
//         id: carId,
//         company: req.body.company,
//         model: req.body.model,
//         year: req.body.year
//     }
//     coches.push(coche)
//     res.status(201).send(coche)

// })

// router.post('/2', (req, res)=>{
//     if(!req.body.company || req.body.company.length < 3 ){
//         res.status(400).send('Introduce la empresa correcto')
//         return
//     }

//     var carId = coches.length;
//     var coche ={
//         id: carId,
//         company: req.body.company,
//         model: req.body.model,
//         year: req.body.year
//     }
    
//     coches.push(coche)
//     res.status(201).send(coche)

// })

router.post('/', [
    check('company').isLength({min: 3}),
    check('model').isString(),
    check('price').isNumeric(),
    check('year').isNumeric()
],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const carBody = req.body;
    console.log('car body', carBody)
    const car = new carModel(carBody);
    try {
        const result = await car.save();
        res.status(201).send(car);
    } catch(err) {
        console.log('cars/',err);
        res.status(409).send('No se pudo guarda el auto');
    }


});

// router.put('/:id', [
//     check('company').isLength({min: 3}),
//     check('model').isLength({min: 3})
// ],(req, res)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

//     if(!coche){
//         return res.status(404).send('El coche con ese ID no esta')
//     }

//     coche.company = req.body.company
//     coche.model = req.body.model
//     coche.year = req.body.year
    
//     res.status(204).send()

// })

// router.delete('/:id', (req, res)=>{
//     const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

//     if(!coche){
//         return res.status(404).send('El coche con ese ID no esta, no se puede borrar')
//     }

//     const index = coches.indexOf(coche)
//     coches.splice(index,1)
//     res.status(200).send('coche borrado')

// })

module.exports = router