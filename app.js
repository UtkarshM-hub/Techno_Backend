require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const commentRouter = require('./routes/commentRoutes');
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 8000;

const connectDB = (url) => {
    mongoose.connect(url);
    console.log(`connected successfully🟩`)
}


app.use(express.json());
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

app.all('*',(req,res)=>{
    res.send('oops!! you came to the wrong route')
})

const start = async(url) => {
    try{
        await connectDB(url)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }catch(err){
        console.log(err);
    }
};

start(process.env.MONGO_PASS);