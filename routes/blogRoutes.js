const express = require('express');
const router = express.Router();

const { createBlog, deleteBlog, updateBlog, getAllBlog, getBlog, AddComment, upload } = require('../controllers/blogControllers');

router.post('/createBlog', createBlog);
router.post('/deleteBlog', deleteBlog);
router.put('/updateBlog', updateBlog);
router.get('/getBlog/:id', getBlog);
router.post('/addComment', AddComment);
router.get('/', getAllBlog);
router.post('/upload', upload);

module.exports = router;