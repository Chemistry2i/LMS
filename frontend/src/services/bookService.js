import api from './api';

const API_BASE = '/books';

export const getBooks = async (params = {}) => {
  const res = await api.get(API_BASE, { params });
  // Backend returns { data: { items, ...pagination } }
  if (res.data?.data?.items) return res.data.data.items;
  if (res.data?.data?.books) return res.data.data.books;
  return [];
};

export const getBook = async (id) => {
  const res = await api.get(`${API_BASE}/${id}`);
  return res.data.data.book;
};

export const addBook = async (bookData) => {
  const res = await api.post(API_BASE, bookData);
  return res.data;
};

export const updateBook = async (id, bookData) => {
  const res = await api.put(`${API_BASE}/${id}`, bookData);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await api.delete(`${API_BASE}/${id}`);
  return res.data;
};
