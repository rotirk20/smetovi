class Contact {
  constructor(name, contactInfo, subject, message, createdAt) {
    this.name = name;
    this.contactInfo = contactInfo;
    this.subject = subject;
    this.message = message;
    this.createdAt = createdAt;
  }
}

module.exports = Contact;
