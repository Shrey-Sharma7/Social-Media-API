const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res) => {
    try{
        const existingUser  = await User.findOne({email: req.body.email})
        if(!existingUser){
            throw new Error('User does not exist')
        }
        if(req.body.password !== existingUser.password){
            throw new Error('Invalid password')
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test, {expiresIn: "10h"}')
        res.status(200).json({jwtToken: token})
    } catch(err){
        res.status(400).json(err.message)   
        }
    }
