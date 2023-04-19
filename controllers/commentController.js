const Comment = require('../Models/Comment')
const { StatusCodes } = require('http-status-codes')
const addComment = async (req, res) => {
    try {
        const { commentAuthor, commentText, commentDate, commentLike } = req.body
        const comment = await Comment.create({ commentAuthor, commentText, commentDate, commentLike })
        res.status(StatusCodes.CREATED).json({ comment })
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { _id } = req.body
        await Comment.findByIdAndDelete({ _id })
        res.status(StatusCodes.OK).json({ msg: "comment deleted successfully " })
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" })
    }
    // res.send("Comment deleted!");
}

const getComment = async (req, res) => {
    try {
        const { _id } = req.body
        const comment = await Comment.findById({ _id })
        res.status(StatusCodes.OK).json({ comment })


    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" })
    }

    // res.send("Single Comment!");
}

const getAllComment = async (req, res) => {
    try {
        const comment = await Comment.find({})
        res.status(StatusCodes.OK).json({ comment })
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "something went wrong" })
    }
    // res.send("All Comments!");
}

module.exports = { addComment, deleteComment, getAllComment, getComment };