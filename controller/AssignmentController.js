const { User, Assignment } = require("../models");

module.exports = class AssignmentController {
    static async fetchAllAssignments(req, res, next) {
        try {
            const { id, role } = req.user.payload;
            let data
            if (role === "admin") {
                data = await Assignment.findAll();
            } else {
                data = await Assignment.findOne({ where: { employeeId: id } });
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async fetchAssignmentsByEmployeeId(req, res, next) {
        try {
            const { id } = req.user.payload
            const data = await Assignment.findOne({ where: { employeeId: id } });
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
            const { task, status } = req.body;
            const employeeId = req.user.payload.id;
            const { role } = req.user.payload;
            const assignment = await Assignment.findOne({ where: { id } });
            if (!assignment) throw { name: "Assignment Not Found" };
            if (role !== "admin" && assignment.employeeId !== employeeId) throw { name: "Unauthorized" }
            await Assignment.update({ status }, { where: { id } });
            res.status(200).json({ message: `${task} status has been update from ${assignment.status} to ${status}` });
        } catch (error) {
            next(error)
        }
    };

    static async deleteAssignment(req, res, next) {
        try {
            const { id } = req.params;
            const assignment = await Assignment.findOne({ where: { id } });
            if (!assignment) throw { name: "Assignment Not Found" };
            await Assignment.destroy({ where: { id } });
            res.status(200).json({ message: `${assignment.task} assignment has been deleted` });
        } catch (error) {
            next(error)
        }
    }
}