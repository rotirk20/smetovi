const ContactService = require("../services/contactService");

exports.sendEmail = async (req, res, next) => {
  try {
    const emailData = req.body;
    await ContactService.sendEmail(emailData);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactService.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

exports.getMessageById = async (req, res, next) => {
  try {
    const message = await ContactService.getMessageById(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
