**Smetovi**

This web is designed for giving informations about a mountain Smetovi near Zenica.

Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Make sure you have the following installed:

- Node.js / Express
- Angular and CSS Framework Tailwind
- npm
  Installation

Set up the Frontend:

```
cd frontend
npm i
npm run start
```

Set up the Backend:

**Create .env in backend folder in this format with already configurated database in MySQL:**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smetovi
DB_PORT=4000
NODE_ENV=development

SMTP_HOST=your-smtp-host                # e.g., smtp.gmail.com
SMTP_PORT=your-smtp-port                # e.g., 587 for TLS or 465 for SSL
SMTP_USER=your-email@gmail.com           # Your email address
SMTP_PASS=your-app-password              # Your app password for the email account
SENDER_EMAIL=your-sender-email           # Email address from which the emails will be sent
DEFAULT_RECEIVER_EMAIL=recipient@example.com # Default recipient email address
DEFAULT_RECEIVER_NAME=your-reveiver-name     # Name of the default recipient
```

Make sure to replace the placeholders with your actual values.

**Note**
If you are using Gmail, you need to enable "Less secure app access" or use an App Password to authenticate.

then

```
cd backend
npm i
npm run start
```

Running the Application
After setting up the frontend and backend, you can access the application at:

http://localhost:3000 Frontend

http://localhost:4000 or any other port from .env Backend
