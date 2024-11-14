const { verifyToken } = require("../helpers/jwt");

module.exports = function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw { name: "Invalid Token" }
        const [type, token] = authorization.split(" ");
        if (!token) throw { name: "Invalid Token" }

        const payload = verifyToken(token);
        req.user = {
            payload //{id, role}
        }
        next()
    } catch (error) {
        next(error)
    }
}