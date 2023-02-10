const express = require('express');
const router = express.Router();

const userLoginRoutes = require('./userLoginController');
router.use("/api/userlogin", userLoginRoutes);

module.exports = router;

