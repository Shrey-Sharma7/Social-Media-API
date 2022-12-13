const User = require('../models/User');
const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const result = {
            user: user.username,
            followerCount: user.followers.length,
            followingCount: user.following.length
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router