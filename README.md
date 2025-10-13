# Full Stack Developer Assignment

This project is a **full-stack job listing web application** built as part of the Bitbash assignment.  
It demonstrates backend API development (Flask), frontend UI (React), database management (SQLAlchemy), and web scraping automation (Selenium).

---

##  Features

###  Frontend (React)
- User authentication (Login / Register)
- Dashboard to view, add, edit, and delete job listings
- Responsive and clean UI built with React + Tailwind CSS

###  Backend (Flask)
- RESTful API endpoints for job listings and users
- JWT-based authentication
- SQLite / PostgreSQL database using SQLAlchemy ORM
- CRUD operations for job management

###  Web Scraping (Selenium)
- Automated job data extraction from public job portals
- Saves scraped jobs into the backend database

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, Tailwind CSS |
| Backend | Flask, Flask-RESTful |
| Database | SQLite / PostgreSQL |
| ORM | SQLAlchemy |
| Automation | Selenium |
| Auth | JWT Tokens |
| Deployment | GitHub / Render (optional) |

---

##  Installation Guide

###  Backend Setup
bash
cd backend
python -m venv env
source env/bin/activate  # for Linux/Mac
env\Scripts\activate     # for Windows
pip install -r requirements.txt
python app.py
