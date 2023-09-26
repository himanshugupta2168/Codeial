const express= require ('express')
const router = express.Router();
const AssignmentController= require("../controllers/assignmentRoute")

router.get('/assign', AssignmentController.assign);

module.exports= router;