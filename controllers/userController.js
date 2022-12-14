const User = require('../models/User')
const Post = require('../models/Post')

exports.getUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        const result = {
            username: user.username,
            followerCount: user.followers.length,
            followingCount: user.following.length
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.followUser = async (req,res) => {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $push: { followers: req.userId } },
            { new: true, useFindAndModify: false }
        );
        await
            User.findByIdAndUpdate(
                req.userId,
                { $push: { following: req.params.id } },
                { new: true, useFindAndModify: false }
            );
        res.status(200).json('Successfully Followed');
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.unfollowUser = async (req,res) => {
    try {
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
    } catch (err) {
        res.status(500).json(err)
    }
}