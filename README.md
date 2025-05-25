
# 📚 Book Review Platform

A full-stack web application that allows users to browse books, read and write reviews, and manage their profiles.

![screenshot](./screenshots/Screenshot%20(354).png)

---

## Important Links
- [Portfolio](https://portfolio-shreyanshs1s-projects.vercel.app/)
- [Github](https://github.com/Shreyanshs1)
- [Repository](https://github.com/Shreyanshs1/Book-Review-Platform)
- [LinkedIn](https://www.linkedin.com/in/shreyansh-srivastava-09b604226/)
- Biggest Project(CareerArcade) [Github](https://github.com/Shreyanshs1/CareerArcade) [Demo](https://careerarcade.vercel.app/)

## 🚀 Features

- Browse books with search and filter functionality
- View detailed book information
- Read user-submitted reviews
- Submit new reviews (rating + comment)
- View and update user profile
- Simple login with dummy user
- Responsive and clean UI using Tailwind CSS

---

## 🧱 Tech Stack

**Frontend**  
- React.js  
- React Router  
- Context API for state management  
- Tailwind CSS for UI

**Backend**  
- Node.js  
- Express.js  
- MongoDB with Mongoose

---

## 📦 Folder Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── index.js
├── .env

frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── api/
│   ├── App.js
│   └── index.js
```

---

## 🔧 Installation

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-db
```

Run the server:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Books
- `GET /books`
- `GET /books/:id`
- `POST /books` *(admin only)*

### Reviews
- `GET /reviews?bookId=BOOK_ID`
- `POST /reviews`

### Users
- `GET /users/:id`
- `PUT /users/:id`

---

## 🧪 Dummy Login

The homepage includes a dummy login button that simulates logging in as a predefined user for testing purposes.

---

## ✅ Future Improvements

- Proper user authentication with JWT
- Admin dashboard for book management
- Review editing and deletion
- Pagination and filters for reviews
- Dark mode toggle

---

## 📄 License

This project is for educational purposes. Modify and use it freely.
