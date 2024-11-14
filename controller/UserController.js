const { compare } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const { User } = require("../models")

module.exports = class UserController {
    static async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "Email / Password is required" }

            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: "Invalid Email / Password" }
            if (!compare(password, user.password)) throw { name: "Invalid Email / Password" }


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

    static async Register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            await User.create(req.body);
            res.status(201).json({ message: `User has been registered with email: ${email}` });
        } catch (error) {
            next(error)
        }
    }
}