# 📌 Professional To-Do App

A **full-stack MERN To-Do Application** with authentication, password reset via email, and secure JWT-based login.  

🚀 Live Demo: [https://professional-to-do.vercel.app](https://professional-to-do.vercel.app)  
🌐 Backend API: [https://professional-to-do.onrender.com/api](https://professional-to-do.onrender.com/api)

---

## ✨ Features
- ✅ User Registration & Login (JWT authentication)  
- ✅ Add, Edit, Delete To-Do tasks  
- ✅ Forgot Password (reset link sent to email)  
- ✅ Reset Password via secure token  
- ✅ Protected routes (only accessible after login)  
- ✅ Responsive UI built with Chakra UI  

---

## 🛠 Tech Stack
- **Frontend**: React, Chakra UI, React Router  
- **Backend**: Node.js, Express.js, MongoDB, JWT  
- **Deployment**: Vercel (frontend), Render (backend)  

---

## 📂 Project Structure
```
professional-to-do/
│── backend/            # Express + MongoDB backend
│   ├── routes/         # Auth & Todo routes
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose models
│   └── server.js       # Entry point
│
│── frontend/           # React + Chakra UI frontend
│   ├── Components/     # UI components
│   ├── App.jsx         # Routes setup
│   └── theme.js        # Chakra theme
│
│── vercel.json         # Needed for React Router deployment on Vercel
└── README.md
```

---

## ⚡ Installation & Setup

### 1. Clone repository
```bash
git clone https://github.com/your-username/professional-to-do.git
cd professional-to-do
```

### 2. Backend setup
```bash
cd backend
npm install
```

- Create a `.env` file:
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_key
CLIENT_URL=https://professional-to-do.vercel.app
```

- Run backend:
```bash
npm start
```

Backend will run on: `http://localhost:5000`

---

### 3. Frontend setup
```bash
cd frontend
npm install
```

- Run frontend:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔑 Password Reset Flow
1. User clicks **Forgot Password** → enters email.  
2. Backend generates a **reset token** and emails a link:  
   ```
   https://professional-to-do.vercel.app/resetpassword/<token>
   ```
3. User clicks the link → React frontend opens Reset Password page.  
4. Frontend calls backend API:  
   ```
   PUT https://professional-to-do.onrender.com/api/auth/resetpassword/<token>
   ```
   with new password.  
5. Password is updated in the database. ✅  

---

## 🖥 Deployment

### Frontend (Vercel)
1. Push frontend code to GitHub.  
2. Connect GitHub repo to Vercel.  
3. Add a `vercel.json` in project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

👉 This ensures React Router routes like `/resetpassword/:token` don’t break.  

### Backend (Render)
1. Push backend code to GitHub.  
2. Create a new **Web Service** on Render.  
3. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).  
4. Deploy.  

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  
- `POST /api/auth/forgotpassword` → Send reset email  
- `PUT /api/auth/resetpassword/:token` → Reset password  

### Todos
- `GET /api/todos` → Get all user todos  
- `POST /api/todos` → Create new todo  
- `PUT /api/todos/:id` → Update todo  
- `DELETE /api/todos/:id` → Delete todo  

---

## 🙌 Contributing
- Fork the repo  
- Create a feature branch (`git checkout -b feature-name`)  
- Commit changes  
- Open a Pull Request  

---

## 📜 License
This project is licensed under the **MIT License**.  
