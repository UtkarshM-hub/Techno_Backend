const express = require('express');
const router = express.Router();

const { addComment, deleteComment, getAllComment, getComment } = require('../controllers/commentController');

router.post('/addComment', addComment);
router.get('/getComment', getComment);
router.delete('/deleteComment', deleteComment);
router.get('/', getAllComment);

module.exports = router;
