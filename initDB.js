const mongoose = require('mongoose')

module.exports = () => {
    mongoose.set('strictQuery', true)
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Mongodb connected....');
        })
        .catch(err => console.log(err.message))
}
