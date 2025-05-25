// src/api/bookApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if your backend runs elsewhere

export const fetchBooks = async (page = 1) => {
  const res = await axios.get(`${API_URL}/books?page=${page}`);
  return res.data;
};
