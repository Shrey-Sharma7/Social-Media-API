const Post = require('../models/Post');
const { listIndexes } = require('../models/User');
const User = require('../models/User');
const router = require('express').Router();

function compare(a, b){
    if(a.createdAt < b.createdAt) return -1;
    else return 1;
}

router.get('/',async(req,res) => {
    try{
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
    } catch(err){
        res.status(404).json('Post not found!')
    }
})

module.exports = router