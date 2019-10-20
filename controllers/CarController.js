const carModel = require('../models/carModel');
const companyModel = require('../models/companyModel');
class CarController {

    async getAllCars() {
        const cars = await carModel
        .find()
        .populate('company','name country');
        if(cars) {
            return cars;
        } else {
            throw 'Autos no encontrado';
        }
    }

    async getCarById(id) {
        const car = await carModel.findById(id)
        .populate('name country');
        if(car) {
            return car;
        } else {
            throw 'Auto no encontrado';
        }
    }

    async saveCar(carBody) {
        const car = new carModel(carBody);
        const result = await car.save();
        if(result) {
            return result;
        }else { 
            throw 'No se pudo guarda el auto';
        }
    }
    
    async updateCar(id,carBody) {
        const car = await carModel.findByIdAndUpdate(
            id, 
            carBody, 
            { new: true}
        );
    
        if(car) { return car; } 
        else { 
            throw 'Coche no encontrado';
        }
    }

    async deleteCar(id) {
        const coche = await carModel.findByIdAndDelete(id);

        if(coche){ return coche; } 
        else { 
            throw 'No se puede borrar el coche o no existe';
        }
    }
}

module.exports = new CarController();