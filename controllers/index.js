const router = require('express').Router();

const userLoginRoutes = require('./userLoginController');
router.use("/api/userlogin", userLoginRoutes);

const blogRoutes = require('./blogController.js')
router.use("/api/blogs", blogRoutes);

module.exports = router;

