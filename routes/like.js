const Post = require('../models/Post');
const User = require('../models/User')
const router = require('express').Router();


router.post('/:id',async (req,res)=>{
    try{ 
        const post = await Post.findById(req.params.id);
        post.like++;
        await post.save();
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router