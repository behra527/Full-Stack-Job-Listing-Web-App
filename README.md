# 💼 Full Stack Job Listing Application

 A **complete full-stack web application** that scrapes job listings from external websites, stores them in a database, and displays them on a custom-built job portal.  
 Built with **Flask (Python)** for the backend, **React.js** for the frontend, and **PostgreSQL** for persistent data storage.


## 🚀 Project Overview

This project was developed as part of the **Bitbash Full Stack Developer Assignment**.  
It demonstrates practical full-stack development  integrating web scraping, backend APIs, and a modern frontend interface.

The workflow is as follows:
1. **Scrape job data** from a public job site using Selenium.  
2. **Store scraped data** into a PostgreSQL database through the Flask backend API.  
3. **Display and manage jobs** through a React-based frontend web application.


## ✨ Features

### 🖥️ Frontend (React + Tailwind CSS)  

- 📋 **Job Dashboard**      View, add, edit, and delete job listings  
- 📱 **Responsive Design**   Mobile-friendly UI using Tailwind CSS  
- ⚡ **Real-Time Updates**  Fetches live job data from the backend API  

### ⚙️ Backend (Flask + RESTful API)
- 🧩 **RESTful Endpoints** for jobs and users  
- 💾 **CRUD Operations** for managing job listings  
- 🧠 **PostgreSQL / SQLAlchemy ORM** integration  
- 📡 **CORS Enabled** for smooth communication with React frontend  

### 🤖 Web Scraping (Selenium)
- 🌐 **Automated Data Extraction** from job websites  
- 💼 **Dynamic Scraping** to handle pagination and real-time job listings  
- 🗄️ **Data Storage** directly into the PostgreSQL database via Flask API  

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Flask (Python), Flask-RESTful |
| **Database** | PostgreSQL |
| **ORM** | SQLAlchemy |
| **Automation** | Selenium |

## ⚙️ Installation & Setup

### 🧩 Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv env

# Activate environment
source env/bin/activate      # macOS / Linux
env\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run Flask app
python app.py
Example: requirements.txt

ini
Copy code
Flask==3.1.0
Flask-RESTful==0.3.10
Flask-CORS==4.0.0
Flask-JWT-Extended==4.6.0
SQLAlchemy==2.0.25
psycopg2-binary==2.9.9
selenium==4.25.0
requests==2.32.3
Backend will start on:

cpp
Copy code
http://127.0.0.1:5000/
🎨 Frontend Setup
bash
Copy code
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
Frontend runs by default on:

arduino
Copy code
http://localhost:3000/
🧩 Database Setup (PostgreSQL)
Install PostgreSQL and create a new database:

sql
Copy code
CREATE DATABASE job_portal;
Update your backend .env or config.py with the database URL:

bash
Copy code
DATABASE_URL=postgresql://username:password@localhost:5432/job_portal
Run initial migrations (if applicable) or let SQLAlchemy create tables automatically on startup.

🕸️ Web Scraping Workflow
The Selenium script (scraper.py) extracts job listings (title, company, location, salary, etc.) from an external site.

The scraped data is automatically sent to the Flask API, which stores it in PostgreSQL.

The React frontend fetches the data from the backend and displays it in a user-friendly format.

Example run:

bash
Copy code
python scraper.py
📂 Project Structure
lua
Copy code
fullstack-job-app/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes/
│   │   └── jobs.py
│   ├── scraper.py
│   ├── config.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
🧪 Example Flow
Step	Description
🕷️	Scraper collects job data from public portals
🔄	Flask backend receives and stores the data
💾	Data saved into PostgreSQL
🌐	React frontend displays job listings dynamically

🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to improve.

📜 License
This project is licensed under the MIT License — see the LICENSE file for details.

👨‍💻 Author
Muhammad Behram Hassan
📧 muhammadbehramhassan@gmail.com
🌐 GitHub

⭐ If this project helped you, please consider giving it a star!






