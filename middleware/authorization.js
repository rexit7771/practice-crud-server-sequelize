module.exports = function authorization(req, res, next) {
    try {
        const { role } = req.user;
        if (role !== "admin") throw { name: "Unauthorized" };
        next()
    } catch (error) {
        next(error)
    }
}