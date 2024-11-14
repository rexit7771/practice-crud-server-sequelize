const assignmentRoutes = require('./assignmentRouter');
const userRoutes = require('./userRouter');
const router = require('express').Router();

router.get("/", (req, res) => res.status(200).json({ message: "Hi There" }));
router.use(userRoutes)
router.use(assignmentRoutes)
module.exports = router