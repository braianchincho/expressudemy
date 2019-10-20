const jwt = require('jsonwebtoken');
const secret = 'la concha de su madre all boys';
const createToken = (user) => {
    const  { _id, nameUser, email} = user;
    const jwtToken = jwt.sign({ _id, nameUser, email },secret);
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
module.exports.createToken = createToken;
module.exports.checkAuthorize = checkAuthorize;