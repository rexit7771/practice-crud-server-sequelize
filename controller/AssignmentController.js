const { Assignment } = require("../models");

module.exports = class AssignmentController {
    static async fetchAllAssignments(req, res, next) {
        try {
            res.status(200).json({ message: "Udah di fetch" })
        } catch (error) {
            console.log(error);

        }
    }
}