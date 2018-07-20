const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const indexController = require("../controller/indexController");


router.get("/getUserInfo.do",userController.getUserInfo);

router.get("/index",indexController.index);


module.exports = router;