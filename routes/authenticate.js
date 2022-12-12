const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

//Did not encrypt password because it is dummy data

//Register user -- dummy user
router.post('/register',async (req,res)=>{
    const user = new User({
        username:'john2',
        email:'xyz@gmail.com',
        password:'123456'
    })
    await user.save();
    res.status(200).json(user);
});

//Login user
router.post('/',async (req,res)=>{
    try{
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser) res.status(404).json('User not found');

        const validPass = await User.findOne({password:req.body.password});
        if(!validPass) res.status(400).json('Wrong Password');

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "10h" });
        
        res.status(200).json({ jwtToken: token });

        // res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;