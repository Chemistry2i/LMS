import api from './api';

// API service for borrowing operations
export const borrowingService = {
  // Admin/Librarian endpoints
  getPendingRequests: async (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit, ...filters };
    const { data } = await api.get('/borrowing/admin/pending-requests', { params });
    return data.data;
  },

  getAllActiveBorrowings: async (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit, ...filters };
    const { data } = await api.get('/borrowing/admin/active', { params });
    return data.data;
  },

  getOverdueBooks: async (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit, ...filters };
    const { data } = await api.get('/borrowing/admin/overdue', { params });
    return data.data;
  },

  getBorrowingStats: async () => {
    const { data } = await api.get('/borrowing/admin/statistics');
    return data.data;
  },

  // Approval workflows
  approveBorrow: async (borrowId) => {
    const { data } = await api.post(`/borrowing/${borrowId}/approve`);
    return data.data;
  },

  rejectBorrow: async (borrowId, reason = '') => {
    const { data } = await api.post(`/borrowing/${borrowId}/reject`, { reason });
    return data.data;
  },

  // User operations (can be called by both users and librarians)
  returnBook: async (borrowId) => {
    const { data } = await api.post('/borrowing/return', { borrowId });
    return data.data;
  },

  renewBook: async (borrowId) => {
    const { data } = await api.post('/borrowing/renew', { borrowId });
    return data.data;
  },

  payFine: async (borrowId, amount) => {
    const { data } = await api.post(`/borrowing/${borrowId}/pay-fine`, { amount });
    return data.data;
  },

  // User history
  getHistory: async (page = 1, limit = 10) => {
    const { data } = await api.get('/borrowing/history', { params: { page, limit } });
    return data.data;
  },
};

export default borrowingService;
