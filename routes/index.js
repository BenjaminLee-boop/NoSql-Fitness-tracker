const router = require('express').Router();
const fitRoute = require('./routes')

router.use('/', fitRoute)

module.exports = router;