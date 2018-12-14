const express = require('express')

const user = require('./user');

const router = express.Router()

router.use('/auth', user);

module.exports = router;
