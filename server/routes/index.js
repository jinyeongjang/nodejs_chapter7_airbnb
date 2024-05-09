const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/booking', require('./booking'));

module.exports = router;
