const User = require('../models/User');
const router = require('express').Router();

router.post('/:id', async (req, res) => {
    try {
        const user = User.findById(req.userId); //me
        const followedUser = User.findById(req.params.id); //followed

        if(!followedUser.followers.includes(userId)){
            res.status(403).json("You are not following this user");
        }
        else{
            followedUser.followers.splice(followedUser.followers.indexOf(userId),1);
            user.following.splice(user.following.indexOf(followedUser._id),1);
        }
        
        await user.save();
        await followedUser.save();

        res.status(200).res(followedUser);

    } catch (error) {
        res.status(500).json(error);
        console.log((error).message);
        console.log((error).stack);
        throw (error).message;
    }
})

module.exports = router