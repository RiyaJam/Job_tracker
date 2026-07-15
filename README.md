# JobTracker 💼 (Java & Spring Boot Edition)

A modern, full-stack web application designed to help job seekers efficiently manage, track, and organize their application process. Built with a premium React frontend and an enterprise-grade Java backend.

## 🌟 Features

- **Intuitive Dashboard:** A beautiful overview of your job search progress with quick-glance metrics.
- **Application Management:** Add, edit, and delete job applications with ease.
- **Status Tracking:** Keep track of where you are in the process (Applied, Interview, Offer, Rejected, Withdrawn).
- **Interactive Filtering:** Quickly filter your application list based on current status.
- **Modern UI/UX:** Built with a premium "glassmorphism" aesthetic, rich gradients, micro-animations, and fully responsive design.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS v4
- Lucide React (Icons)
- Axios

**Backend:**
- Java 17
- Spring Boot 3 (Web, Data JPA)
- H2 Database (Zero-configuration in-memory SQL database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Java 17 (JDK)
- An IDE (IntelliJ IDEA, Eclipse, or VS Code with Java extensions)

### Database Setup
None! This project uses an H2 in-memory database. Spring Boot will automatically create the database and tables the moment you start the app. You can even view the database visually by going to `http://localhost:8080/h2-console` in your browser (Username: `sa`, Password: `[leave blank]`).

### Backend Setup
We have bundled a **Maven Wrapper** with this project, so you don't even need Maven installed on your computer to run the Java code!

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot server using the wrapper:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
*(The server will download dependencies on the first run, automatically create the H2 database, and start on `http://localhost:8080`)*

### Frontend Setup
Open a terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`. Open this link in your browser to view the app!*

## 📸 Screenshots

*(Add screenshots of your dashboard and application form here before uploading to GitHub to make your resume project stand out even more!)*

## 📝 License
This project is open-source and available under the MIT License.
