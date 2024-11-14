const { compare } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const { User } = require("../models")

module.exports = class UserController {
    static async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } })
            if (!user) throw { message: "Invalid Email / Password" }
            if (!compare(password, user.password)) throw { message: "Invalid Email / Password" }


            const payload = {
                id: user.id,
                role: user.role
            }
            const access_token = signPayload(payload);
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}