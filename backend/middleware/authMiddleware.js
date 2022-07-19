const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            // get token from header | split bearer (index 0) & token (index 1) into array
      
            token = req.headers.authorization.split(' ')[1]
        

            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
            // get user find by decoded id  | select not include the password
            req.user = await User.findById(decoded.id).select('-password');
            
            next()
        }catch(err){
            console.log('protect',err)
            res.status(401)
            throw new Error('not authorize');
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorize, no token')
    }
})


module.exports = {
    protect
}