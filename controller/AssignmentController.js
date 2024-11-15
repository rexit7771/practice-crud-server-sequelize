const { User, Assignment } = require("../models");

module.exports = class AssignmentController {
    static async fetchAllAssignments(req, res, next) {
        try {
            const data = await Assignment.findAll();
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addNewAssignment(req, res, next) {
        try {
            const { task, employeeId } = req.body
            const employee = await User.findByPk(employeeId);
            if (!employee) throw { name: "Employee Not Found" }

            await Assignment.create(req.body) // {task, employeeId}
            res.status(201).json({ message: `${task} Assignment has been added to employee with id ${employeeId}` });
        } catch (error) {
            next(error)
        }
    }

    static async editAssignment(req, res, next) {
        try {
            const { id } = req.params;
            const { task, status } = req.body
            const assignment = await Assignment.findOne({ where: { id } });
            if (!assignment) throw { name: "Assignment Not Found" }

            await Assignment.update({ status });
            res.status(200).json({ message: `${task} status has been update from ${assignment.status} to ${status}` });
        } catch (error) {
            next(error)
        }
    }
}