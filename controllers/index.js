const router = require('express').Router();

// connects to the routes in the user login controller
const userLoginRoutes = require('./userLoginController');
router.use("/api/userlogin", userLoginRoutes);

// connects to the routes at the blog controller
const blogRoutes = require('./blogController.js');
router.use("/api/blogs", blogRoutes);

// connects to the routes at the comment controller
const commentRoutes = require('./commentController.js');
router.use("/api/comment", commentRoutes);


// connects to the routes in the front end controller
const frontEndRoutes = require('./frontEndController');
router.use("/", frontEndRoutes);

module.exports = router;

