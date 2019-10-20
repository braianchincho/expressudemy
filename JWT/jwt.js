const jwt = require('jsonwebtoken');
const secret = 'la concha de su madre all boys';
const userModel = require('../models/userModel');
const createToken = (user) => {
    const  { _id, nameUser, email, role} = user;
    const jwtToken = jwt.sign({ _id, nameUser, email, role },secret);
    return { token: jwtToken};
}
const checkAuthorize = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(403).send('No autenticado');
    }

    try {
        const payload = jwt.verify(token,secret);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).send('Accceso denegado');
    }
};
const autorizeByRoles = (roles = []) => {
    return [
        (req,res,next) => {
            if( !roles.includes(req.user.role) ) {
                return res.status(403).send('No esta autorizado a esta operación');
            }
            next();
        }
    ];
};

module.exports.createToken = createToken;
module.exports.checkAuthorize = checkAuthorize;
module.exports.autorizeByRoles = autorizeByRoles;

