// src/api/bookApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if your backend runs elsewhere

export const fetchBooks = async (page = 1) => {
  const res = await axios.get(`${API_URL}/books?page=${page}`);
  return res.data;
};

export const fetchBookById = async (id) => {
  const res = await axios.get(`http://localhost:5000/books/${id}`);
  return res.data;
};

export const fetchReviewsByBook = async (bookId) => {
  const res = await axios.get(`http://localhost:5000/reviews?bookId=${bookId}`);
  return res.data;
};

export const submitReview = async (reviewData) => {
  const res = await axios.post('http://localhost:5000/reviews', reviewData);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export const updateUserById = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/users/${id}`, updatedData);
  return res.data;
};