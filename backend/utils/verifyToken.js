const jwt = require('jsonwebtoken');
const createError = require("../utils/error")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "Your are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "Your are not authorized!"));
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "Your are not authorized!"));
        }
    })
}

module.exports = {verifyToken, verifyUser, verifyAdmin};