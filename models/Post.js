const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        max:50
    },
    description:{
        type:String
    },
    like:{
        type:Number,
        default:0
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:'Comment'
    }]
}, 
    {timestamps:true}
);

module.exports = mongoose.model('Post',postSchema);