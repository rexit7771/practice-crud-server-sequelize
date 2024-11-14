module.exports = function errorHandler(error, req, res, next) {
    console.log(error.message);
    let status = 500
    let message = error.message || "Internal Server error";

    switch (error.message) {
        case "Invalid Email / Password":
        case "Invalid Token":
            status = 401;
            break;
    }
    return res.status(status).json({ message })
}