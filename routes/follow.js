const User = require('../models/User');
const router = require('express').Router();

router.post('/:id',async (req,res)=>{
    try{ 
        const user = User.findById(req.userId); //me
        const followedUser = User.findById(req.params.id); //followed

        followedUser.followers.push(userId);
        user.following.push(followedUser._id);
        await user.save();
        await followedUser.save();

        res.status(200).res(followedUser);

    } catch(error){
        res.status(500).json(error);
        console.log( (error).message);
        console.log( (error).stack);
        throw (error).message;
    }
})

module.exports = router