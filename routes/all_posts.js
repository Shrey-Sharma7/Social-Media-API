const Post = require('../models/Post');
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
        const userPosts = user.posts;
        res.status(200).json(user.posts.sort(compare));
    } catch(err){
        res.status(400).json('No post with id')
    }
})

module.exports = router