const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

function compare(a, b){
    if(a.createdAt < b.createdAt) return -1;
    else return 1;
}

exports.getAllPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate({
            path: 'posts',
            populate: {
                path: 'comments',
                model: 'Comment'
            }
        });
        // extract particular fields from userPosts
        const userPosts = user.posts.map(post => {
            return {
                _id: post._id,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                comments: post.comments.map(el => {
                    return {
                        comment: el.comment
                    }
                }),
                likes: post.like
            }
        })

        // sort posts by createdAt
        res.status(200).json(userPosts.sort(compare));
    } catch (err) {
        res.status(404).json('Post not found!')
    }
}

exports.getPost = async (req, res) => {
    try {
        const currentPost = await Post.findById(req.params.id).populate('comments');
        const comments = currentPost.comments.map(el => {
            return {
                comment: el.comment,
            }
        })
        const { __v, createdAt, updatedAt, ...other } = currentPost._doc;
        other.comments = comments;
        res.status(200).json(other);

    } catch (err) {
        res.status(400).json('Invalid post id')
    }
}

exports.createPost = async (req, res) => {
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
}

exports.deletePost = async (req, res) => {
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
}

exports.createComment = async (req, res) => {
    try {
        const newComment = await new Comment({
            comment: req.body.comment
        })
        await newComment.save();

        await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: newComment._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json({ commentId: newComment._id });

    } catch (err) {
        res.status(500).json(err.message);
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.like++;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.like > 0) post.like--;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}