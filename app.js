require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const authRoute = require('./routes/authenticate')
const likeRoute = require('./routes/like')
const unlikeRoute = require('./routes/unlike')
const commentRoute = require('./routes/comment')
const allPostsRoute = require('./routes/all_posts')
const followRoute = require('./routes/follow')
const unfollowRoute = require('./routes/unfollow')
const { authCheck } = require('./middleware/auth.js')

const PORT = process.env.PORT || 3000;
//Connections

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("connected to mongoDB")
});

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

//Routes

app.use('/api/user', authCheck, userRoute);
app.use('/api/authenticate', authRoute);
app.use('/api/posts', authCheck, postRoute);
app.use('/api/like', authCheck, likeRoute);
app.use('/api/unlike', authCheck, unlikeRoute);
app.use('/api/comment', authCheck, commentRoute);
app.use('/api/all_posts', authCheck, allPostsRoute);
app.use('/api/follow', authCheck, followRoute);
app.use('/api/unfollow', authCheck, unfollowRoute);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

module.exports = app;