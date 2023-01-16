const User =require('../models/User')
const jwt =require('jsonwebtoken')

//handle errors
const handleErrors =(err)=>{
    console.log(err.message,err.code)
    let errors = {email:'',password:''};
    //Existing user error handling
    if(err.code === 11000){
        errors.email = "email is already registered";
        return errors;
    }
    if(err.message === 'incorrect email'){
        errors.email = "email is incorect";
        return errors;
    }
    if(err.message === 'incorrect password'){
        errors.password = "password is incorect";
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
const maxAge = 3 *24*60*60; //3 days, time in seconds
const createToken = (id)=>{
    return jwt.sign({ id },'secret-and-should-be-long',{
        expiresIn: maxAge
    });
}


const signup_get_controller = (req,res)=>{
    res.render('signup')
}
const signup_post_controller = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
        res.status(201).json({user:user.id})
    } catch (error) {
        //console.error(error.message)
       const err =  handleErrors(error)
       res.status(400).json({err})
    }
}
const login_get_controller = (req,res)=>{
    res.render('login')
}
const login_post_controller =async (req,res)=>{
    const {email,password} = req.body    
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
        res.status(200).json({user:user._id})

    } catch (error) {
        const err = handleErrors(error)
        res.status(400).json({err})
    }
}
const logout_get_controller = (req,res)=>{
    res.cookie('jwt','',{maxAge:1}) 
    res.redirect('/')

}

module.exports ={
    signup_get_controller,
    signup_post_controller,
    login_get_controller,
    login_post_controller,
    logout_get_controller

}