// contactController.js

const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

// Function to handle sending contact emails
const sendContactEmail = async (req, res) => {
  const { name, contactInfo, subject, message } = req.body;

  try {
    const contact = await Contact.create({ name, contactInfo, subject, message });
    res.status(201).json({message: "Message sent successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  const mailOptions = {
    from: `${name} <${contactInfo || process.env.DEFAULT_SENDER_EMAIL}>`,
    to: `${process.env.DEFAULT_RECEIVER_NAME} <${process.env.DEFAULT_RECEIVER_EMAIL}>`,
    subject: subject,
    text: `Message from ${name} (${contactInfo}):\n\n${message}`,
  };

  console.log("Mail options prepared:", mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error caught while sending email:", error.message);
    throw new Error("An error occurred while sending the email.");
  }
};

const getAllMessages = async () => {
  return await ContactRepository.findAllMessages();
};

const getMessageById = async (id) => {
  const message = await ContactRepository.findMessageById(id);
  if (!message) {
    throw new Error("Message not found");
  }
  return message;
};

module.exports = {
  sendContactEmail,
};
