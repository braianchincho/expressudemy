const userModel = require('../models/userModel');
const carModel = require('../models/carModel');
const SaleModel = require('../models/saleModel');
const mongoose = require('mongoose');
class SaleController {

    async getAllSales(req,res) {
        const Sales= await SaleModel.find();
        if(Sales) {
           return res.send(Sales);
        } else {
           return res.status(404).send('No se encontraron el ventas');
        }
    }

    async getSaleById(req,res) {
        const { id } = req.params;
        const Sale = await SaleModel.findById(id);
        if(Sale) {
           return res.send(Sale);
        } else {
           return res.status(404).send('No se encontro el venta');
        }
    }

    async saveSale(req,res) {
        const SaleBody = req.body;
        const user = await userModel.findById(SaleBody.userId);
        if(!user) {
            return res.status(404).send('El usuario no existe');
        }

        const car = await carModel.findById(SaleBody.carId);
        if(!car) {
            return res.status(404).send('El auto no existe');
        }
        if(car.sold) {
            return res.status(409).send('El auto ya fue vendido');
        }
        const Sale = new SaleModel({
            user: {
                _id: user._id,
                name: user.nameUser,
                email: user.email
            },
            car: {
                _id: car._id,
                model: car.model
            },
            price: SaleBody.price
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const result = await Sale.save();
            user.isCustomer = true;
            user.save();
            car.sold = true;
            car.save();
            await session.commitTransaction();
            session.endSession();
            return res.status(201).send(result);
        } catch(e) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send('No se pudo ejecutar la venta');
        }
    }
    
}

module.exports = new SaleController();