const userModel = require('../models/UserModel');
class UserController {

    async getAllUsers(req,res) {
        const users = await userModel.find();
        if(users) {
           return res.send(users);
        } else {
           return res.status(404).send('No se encontraron el usuarios');
        }
    }

    async getUserById(req,res) {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(user) {
           return res.send(user);
        } else {
           return res.status(404).send('No se encontro el usuario');
        }
    }

    async saveUser(req,res) {
        const userBody = req.body;
        const user = new userModel(userBody);
        const result = await user.save();
        if(result) {
            return res.send(result);
        } else {
            return res.status(409).send('Error al guardar');
        }
   
    }
    
    async updateUser(req,res) {
        const result = await userModel.findByIdAndUpdate(
            req.params.id , req.body , {new:true});
        if(result) {
            return res.send(result);
        } else {
            return res.status(404).send('No se encontro el usuario');
        }
    }

    async deleteUser(req,res) {
        const result = await userModel.findByIdAndDelete(req.params.id)
        if(result) {
            return res.send(result);
        } else {
            return res.status(404).send('No se encontro el usuario');
        }
    }
}

module.exports = new UserController();