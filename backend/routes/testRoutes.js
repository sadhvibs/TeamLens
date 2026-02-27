const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

//only logged in users
router.get("/member", protect, (req, res) => {
    res.json(req.user);
    console.log("Headers:", req.headers.authorization);
})

//only team leader
router.get("/team-lead", protect, authorizeRoles("TEAM_LEAD"), (req, res) => {
    res.json({ message: "Welcome Team Lead!" });
})

module.exports = router;