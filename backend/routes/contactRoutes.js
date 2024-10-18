const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET methods for future use

// Get all messages (for future use)
// router.get("/", contactController.getAllMessages);

// Get a specific message by ID (for future use)
// router.get("/:id", contactController.getMessageById);

// POST route to handle contact form submission
router.post('/send', contactController.sendContactEmail);

module.exports = router;