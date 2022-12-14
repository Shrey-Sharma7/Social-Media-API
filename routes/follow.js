const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/:id', userController.followUser)

module.exports = router