const Blog = require('../Models/Blog');
const { StatusCodes } = require('http-status-codes');

const createBlog = async (req, res) => {
    // res.send('Blog Created!');
    try {
        const { title, author, description, content,image } = req.body;
        const date = new Date().getDate();
        const blog = await Blog.create({ title, author, description, content, date,image });
        res.status(StatusCodes.CREATED).json({ blog });
    } catch (err) {
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }
}

const deleteBlog = async (req, res) => {
    // res.send('Blog Deleted!');
    try {
        const { _id } = req.body;
        const blog = await Blog.findByIdAndDelete(_id)
        res.status(StatusCodes.OK).json({ msg: 'Blog Deleted Successfully!' });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }
}

const updateBlog = async (req, res) => {
    // res.send('Blog Updated!');
    try {
        const { _id, newTitle, newAuthor, newDesc, newContent } = req.body;
        console.log(req.body);
        const blog = await Blog.findOneAndUpdate({ _id }, { title: newTitle, author: newAuthor, content: newContent, description: newDesc });
        res.status(StatusCodes.OK).json({ blog });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blog = await Blog.find({});
        res.status(StatusCodes.OK).json({ blog });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });

    }
}

const getBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const blog = await Blog.findOne({ _id }).populate("author");
        res.status(StatusCodes.OK).json({ blog });
        // const blog = await Blog.findOne({)
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }
    // res.send('Single Blog');
}

const AddComment=async(req,res)=>{
    try {
        const {_id,name,date,text} = req.body;
        const comment = await Blog.updateOne({"_id":_id},{$push:{"comments":{name:name,date:date,text:text}}});
        res.status(StatusCodes.OK).json({ comment });
        // const blog = await Blog.findOne({)
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
    }
}

module.exports = { createBlog, updateBlog, deleteBlog, getAllBlog, getBlog,AddComment };