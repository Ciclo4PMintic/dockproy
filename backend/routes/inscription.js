const express=require('express');
const router = express.Router();
const { createInscription,getInscription, getInscriptionByProject, updateInscriptionById,deleteInscriptionById, getInscriptionByStudent} = require('../controllers/inscription')
const { protect,isUser, isAdminorLeader, isLeader, isAdmin, isAuthorized} = require("../middleware/auth");

router.route("/").get( [protect, isAdmin],getInscription );

router.route("/:project").get([protect,isLeader],getInscriptionByProject);
router.route("/").post([protect,isAuthorized], createInscription);

router.route("/:inscriptionId").put([protect, isAdminorLeader], updateInscriptionById);
  
router.route("/:inscriptionId").delete([protect,isAdminorLeader ], deleteInscriptionById);
router.route("/studentInscription/:student").get([protect,isUser], getInscriptionByStudent);



module.exports=router;