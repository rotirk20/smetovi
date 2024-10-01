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
```
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
