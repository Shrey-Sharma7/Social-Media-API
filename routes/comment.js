const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/:id',postController.createComment)

module.exports = router