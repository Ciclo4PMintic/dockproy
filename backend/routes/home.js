const express = require("express");
const router = express.Router();
const { getHomeRoute } = require("../controllers/home");
const { protect,isAuthorized } = require("../middleware/auth");



router.route("/").get([protect,isAuthorized], getHomeRoute);

module.exports = router;