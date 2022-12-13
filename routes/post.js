const Post = require('../models/Post');
const User = require('../models/User');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
    try {
        const currentPost = await Post.findById(req.params.id).populate('comments');
        const { __v, createdAt, updatedAt, ...other } = currentPost._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(400).json('Invalid post id')
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            description: req.body.description
        })

        await post.save();

        await User.findByIdAndUpdate(
            req.userId,
            { $push: { posts: post._id } },
            { new: true, useFindAndModify: false }
        );

        const { like, comment, __v, updatedAt, ...other } = post._doc;
        res.status(200).json(other);

    } catch (err) {
        res.status(400).json(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.posts.find((post) => {
            return post.equals(req.params.id);
        })) {
            await Post.findByIdAndDelete(req.params.id);
            await User.updateOne({ _id: req.userId }, {
                $pullAll: {
                    posts: [{ _id: req.params.id }],
                },
            });

            res.status(204).json('Post deleted successfully')
        }
        else throw new Error('Invalid post id')
    } catch (err) {
        res.status(400).json(err.message)
    }
})


module.exports = router