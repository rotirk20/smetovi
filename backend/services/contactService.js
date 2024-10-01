const Contact = require("../models/contact");
const nodemailer = require("nodemailer");
require("dotenv").config();
const ContactRepository = require("../repositories/contactRepository");

class ContactService {
  async sendEmail(data) {
    const { name, contactInfo, subject, message } = data;

    console.log("Preparing to send email with the following data:", {
      name,
      contactInfo,
      subject,
      message,
    });

    const contact = new Contact(
      name,
      contactInfo,
      subject,
      message,
      new Date()
    );

    //  Save message to the databaseif needed
    //  await ContactRepository.createMessage(contact);

    console.log("Contact message saved to the database:", contact);

    const transporter = nodemailer.createTransport({
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

    return contact;
  }

  async getAllMessages() {
    return await ContactRepository.findAllMessages();
  }

  async getMessageById(id) {
    const message = await ContactRepository.findMessageById(id);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  }
}

module.exports = new ContactService();
