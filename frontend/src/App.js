import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import ReviewFormPage from './pages/ReviewFormPage';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
        <Route path="/review" element={<ReviewFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
