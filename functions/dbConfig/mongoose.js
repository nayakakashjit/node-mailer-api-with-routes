// Database connection
const mongoose = require('mongoose')

const URL = 'mongodb+srv://umaloan:umaloan1a2b3c@cluster0.ududwug.mongodb.net/umaloan';
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log('Connected to database'))
.catch((err)=> console.log('Could not connect to the database ->>>>>>>', err))