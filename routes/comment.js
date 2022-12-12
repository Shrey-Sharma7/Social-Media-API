const Comment = require('../models/Comment');
const Post = require('../models/Post');
const router = require('express').Router();

router.post('/:id',async (req,res)=>{
    try{ 
        const newComment = await new Comment({
            comment: req.body.comment
        })
        await newComment.save();     

        await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: newComment._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json({commentId: newComment._id});

    } catch(error){
        res.status(500).json(error);
        console.log( (error).message);
        console.log( (error).stack);
        throw (error).message;
    }
})

module.exports = router