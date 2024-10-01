const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

// GET methods for future use

// Get all messages (for future use)
// router.get("/", contactController.getAllMessages);

// Get a specific message by ID (for future use)
// router.get("/:id", contactController.getMessageById);

// Route to send an email
router.post("/send", contactController.sendEmail);

module.exports = router;
