const express=require('express');
const router = express.Router();
const { createAdvance,getAdvanceByProject, getAdvanceByStudent, updateAdvanceById, deleteAdvanceById} = require('../controllers/advance')
const { protect,isUser, isUserorLeader} = require("../middleware/auth");



router.route("/:student").get([protect,isUser],getAdvanceByStudent);
router.route("/search/:project").get([protect,isUserorLeader],getAdvanceByProject);
router.route("/").post([protect,isUser], createAdvance);

router.route("/:advanceId").put([protect, isUserorLeader], updateAdvanceById);
  
router.route("/:advanceId").delete([protect,isUserorLeader ], deleteAdvanceById);



module.exports=router;