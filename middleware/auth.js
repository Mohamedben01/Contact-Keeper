const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get Token form header
    const token = req.header('x-auth-token');
    //Check if not token
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied.' })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token is not valid' })
    }
}