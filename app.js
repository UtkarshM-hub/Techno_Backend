require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const commentRouter = require('./routes/commentRoutes');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR');
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
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