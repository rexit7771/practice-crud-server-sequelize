const AssignmentController = require('../controller/AssignmentController');

const assignmentRoutes = require('express').Router();

assignmentRoutes.get("/assignments", AssignmentController.fetchAllAssignments);
assignmentRoutes.post("/addAssignment", AssignmentController.addNewAssignment)

module.exports = assignmentRoutes