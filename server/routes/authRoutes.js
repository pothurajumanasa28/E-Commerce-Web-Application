const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "You can access this protected route.",
        user: req.user
    });
});
router.get("/admin-test", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin! You can access this route."
    });
});
module.exports = router;