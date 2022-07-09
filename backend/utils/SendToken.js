const jwt=require('jsonwebtoken');
require('dotenv').config()

const sendToken=(user,role,statusCode,res) => {
    

    const token =jwt.sign({id:user.user_id,role:role},process.env.JWT_SECRECT,{
        expiresIn:process.env.JWTEXPIRETIME
    });

    const options = {
        expires: new Date(
            Date.now() +process.env.COOKIEEXPIRETIME*24*60*60*1000,
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        token,
        user,
        role
    })
}

module.exports =sendToken;