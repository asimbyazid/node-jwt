const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req,res,next)=>{
    const token =req.cookies.jwt;
    //check json web token exit
    if(token){
        jwt.verify(token,'secret-and-should-be-long',(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }
    res.redirect('/login')
}

//check current user
const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'secret-and-should-be-long',async(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user =null
                next();
            }else{
                console.log(decodedToken)
                let user =await User.findById(decodedToken.id)
                res.locals.user=user; // we can have access to this user in all views
                next();
            }
        })
    }else{
        res.locals.user =null
        next();
    }
}

module.exports = {requireAuth,checkUser};