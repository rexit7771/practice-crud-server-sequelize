const AssignmentController = require('../controller/AssignmentController');

const assignmentRoutes = require('express').Router();

assignmentRoutes.get("/assignments", AssignmentController.fetchAllAssignments);

module.exports = assignmentRoutes