module.exports = function authorization(req, res, next) {
    try {
        const { role } = req.user.payload;
        if (role !== "admin") throw { name: "Unauthorized" };
        next()
    } catch (error) {
        next(error)
    }
}