const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/:id', postController.getPost)

router.post('/', postController.createPost)

router.delete('/:id', postController.deletePost)


module.exports = router