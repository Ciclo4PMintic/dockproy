const express=require('express');
const router = express.Router();
const { createProject,getProjectByLeader,getProjects,updateProjectById,deleteProjectById,getListProjectsStudents } = require('../controllers/project')
const { protect, isAdminorLeader, isLeader, isAdmin,  isUser} = require("../middleware/auth");

router.route("/").get( [protect,isAdmin],getProjects );
router.route("/listProjects").get( [protect,isUser],getListProjectsStudents );
router.route("/:leader").get([protect, isLeader],getProjectByLeader);

router.route("/").post([protect,isAdminorLeader], createProject);

router.route("/:projectId").put([protect, isAdminorLeader], updateProjectById);
  
router.route("/:projectId").delete([protect,isAdminorLeader ], deleteProjectById);
  


module.exports=router;