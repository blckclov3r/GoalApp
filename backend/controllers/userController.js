const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registerUser = asyncHandler( async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all field')
    }

    // check user if exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // create user
    const user = await User.create({
        name,email,password: hashedPassword
    })
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400)
        throw new Error('invalid user data');
    }
})

const loginUser = asyncHandler( async(req,res)=>{
    const {email,password} = req.body

    // check for user email
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400)
        throw new Error('invalid credentials');
    }

    // res.status(200).json({message: 'Login User'});
})

const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}