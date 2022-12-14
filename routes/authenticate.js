const router = require('express').Router()
const User = require('../models/User')
const authController = require('../controllers/authController')

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
router.post('/', authController.authenticateUser);

module.exports = router