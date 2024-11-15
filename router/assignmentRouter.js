const AssignmentController = require('../controller/AssignmentController');
const authorization = require('../middleware/authorization');

const assignmentRoutes = require('express').Router();

assignmentRoutes.get("/assignments", AssignmentController.fetchAllAssignments);
assignmentRoutes.post("/addAssignment", authorization, AssignmentController.addNewAssignment)
assignmentRoutes.put("/editAssignment/:id", AssignmentController.editAssignment)

module.exports = assignmentRoutes