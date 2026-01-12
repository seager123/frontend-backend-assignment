# Frontend Developer Assignment

## Tech Stack
- **Frontend:** React.js, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **HTTP Client:** Axios  

## Features

### Frontend
- Login page  
- Dashboard page  
- Protected routes (dashboard accessible only after login)  
- Task CRUD UI (Add / Delete tasks)  
- Axios connection with backend APIs  

### Backend
- Express server with REST APIs  
- MongoDB Atlas connected  
- `/login` API for user authentication  
- `/tasks` API (GET, POST, DELETE) for task management  
- JWT-based authentication middleware  
- Password hashing with bcrypt  
- Complete CRUD operations implemented  

### Security & Scalability
- JWT authentication for protected routes  
- Passwords securely hashed  
- Modular and scalable code structure  
- Error handling and input validation  

## APIs
- **Login:** `POST http://localhost:5000/login`  
- **Tasks CRUD:** `GET/POST/DELETE http://localhost:5000/tasks`  

## How to Run
cd backend
npm install
node server.js

Login: http://localhost:5000/login

Tasks CRUD: http://localhost:5000/tasks

2️⃣ Frontend
cd frontend
npm install
npm run dev


Frontend default port 5173 pe run hoga (Vite)

Browser me open karo: http://localhost:5173

