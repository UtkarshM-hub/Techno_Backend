const express = require('express')
const router = express.Router();
// const { about, contact, homepage } = require('../controllers/dataContoller');


router.route('/home').get(homepage);
router.route('/about').get(about);
router.route('/contact').get(contact);

module.exports = router;