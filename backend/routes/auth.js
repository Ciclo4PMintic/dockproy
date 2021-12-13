const express=require('express');
const router = express.Router();
const { register,getUserStudent, login,forgotPassword, resetPassword, getUsers,getUserByEmail, updateUserById, deleteUserById, getUserById } = require('../controllers/auth');
const { protect, isAdmin, isUser,isAuthorized, isAdminorLeader, isLeader} = require("../middleware/auth");



router.route("/:userId").delete([protect,isAdmin], deleteUserById);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/").get([protect,isAdmin], getUsers);
router.route("/:userId").put([protect,isAuthorized], updateUserById);
router.route("/:email").get([protect,isAuthorized], getUserByEmail)
router.route("/getStudent/active").get([protect,isLeader], getUserStudent)

  

module.exports=router;

