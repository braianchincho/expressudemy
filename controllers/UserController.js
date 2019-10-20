const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../JWT/jwt');
class UserController {

    async getAllUsers(req,res) {
        const users = await userModel.find()
        .select(['nameUser','email', 'isCustomer']);
        if(users) {
           return res.send(users);
        } else {
           return res.status(404).send('No se encontraron el usuarios');
        }
    }

    async getUserById(req,res) {
        const { id } = req.params;
        const user = await userModel.findById(id).select(['nameUser','email', 'isCustomer']);;
        if(user) {
           return res.send(user);
        } else {
           return res.status(404).send('No se encontro el usuario');
        }
    }

    async saveUser(req,res) {
        const  { nameUser, email, password } = req.body;
        const userBody = { nameUser, email, password, isCustomer: false };
        let user = await userModel.findOne({email: req.body.email});
        if(user) {
            return res.status('400').send('Ese usuario ya existe');
        }
        // hash de password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        userBody.password = hashPass;
        user = new userModel(userBody);
        const result = await user.save();
        if(result) {
            const {_id } = result;
            const token = createToken(user).token;
            return res.header('Authorization',token).send({_id, nameUser,email});
        } else {
            return res.status(409).send('Error al guardar');
        }
   
    }
    
    // async updateUser(req,res) {
    //     const result = await userModel.findByIdAndUpdate(
    //         req.params.id , req.body , {new:true});
    //     if(result) {
    //         return res.send(result);
    //     } else {
    //         return res.status(404).send('No se encontro el usuario');
    //     }
    // }

    async deleteUser(req,res) {
        const result = await userModel.findByIdAndDelete(req.params.id)
        if(result) {
            const {_id, nameUser} = result;
            return res.send({_id, nameUser});
        } else {
            return res.status(404).send('No se encontro el usuario');
        }
    }
}

module.exports = new UserController();