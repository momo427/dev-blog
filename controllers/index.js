const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;