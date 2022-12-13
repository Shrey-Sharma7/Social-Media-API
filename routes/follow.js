const User = require('../models/User');
const router = require('express').Router();

router.post('/:id', async (req, res) => {
    try {
        // const user = User.findById(req.userId); //me
        const followedUser = User.findById(req.params.id); //followed

        await User.findByIdAndUpdate(
            req.params.id,
            { $push: { followers: req.userId } },
            { new: true, useFindAndModify: false }
        );
        await User.findByIdAndUpdate(
            req.userId,
            { $push: { following: req.params.id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json('Successfully Followed');

    } catch (error) {
        res.status(500).json(error);
        console.log((error).message);
        console.log((error).stack);
        throw (error).message;
    }
})


module.exports = router