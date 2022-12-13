const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');

//Did not encrypt password because it is dummy data

//Register user -- dummy user
router.post('/register', async (req, res) => {
    const user = new User({
        username: 'john',
        email: 'abcd@gmail.com',
        password: '12345678'
    })
    await user.save()
    res.status(200).json(user);
})

//Authenticate currently logged in user.
router.post('/', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            throw new Error('User does not exist')
        }

        if(req.body.password !== existingUser.password){
            throw new Error('Invalid password')
        }
 
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "10h" });

        res.status(200).json({ jwtToken: token })

    } catch (err) {
        res.status(400).json(err.message)
    }
});

module.exports = router