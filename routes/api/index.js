const router = require("express").Router();
const eventsRoutes = require("./events");
const usersRoutes = require("./users");

// Book routes
router.use("/events", eventsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
