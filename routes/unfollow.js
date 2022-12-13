const User = require('../models/User');
const router = require('express').Router();

router.post('/:id', async (req, res) => {
    try {
        // const user = User.findById(req.userId); //me
        const followedUser = User.findById(req.params.id); //followed
        await User.updateOne({ _id: req.params.id }, {
            $pullAll: {
                followers: [{_id: req.userId}],
            },
        });
        await User.updateOne({ _id: req.userId }, {
            $pullAll: {
                following: [{_id: req.params.id}],
            }
        });
        res.status(200).json('Succesfully Unfollowed');

    } catch (error) {
        res.status(500).json(error);
        console.log((error).message);
        console.log((error).stack);
        throw (error).message;
    }
})

module.exports = router