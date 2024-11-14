module.exports = function errorHandler(error, req, res, next) {
    console.log(error);
    let status = 500
    let message = error.name || "Internal Server error";

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = error.errors[0].message
            break;
        case "Email / Password is required":
            status = 400;
            break;
        case "Invalid Email / Password":
        case "Invalid Token":
            status = 401;
            break;
    }
    return res.status(status).json({ message })
}