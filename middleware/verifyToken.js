const jwt = require('jsonwebtoken');
const appError = require('../utilites/appError')
const httpStatusText = require('../utilites/httpStatusText')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']

    if(!authHeader) {
        const error = appError.create("token is required!", 401, httpStatusText.FAIL);
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.currentUser = currentUser;
        next();
    } catch (e) {
        const error = appError.create("invalid token", 401, httpStatusText.FAIL);
        return next(error);
    }

};

module.exports = verifyToken;