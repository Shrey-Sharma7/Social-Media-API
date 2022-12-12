const Post = require('../models/Post');
const router = require('express').Router();


router.post('/:id',async (req,res)=>{
    try{ 
        const post = await Post.findById(req.params.id);
        if(post.like > 0) post.like--;
        await post.save();
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router