
import api from './api';

const API_BASE = '/dashboard';

export const getDashboardOverview = () =>
	api.get(`${API_BASE}/overview`).then(res => {
		console.log('API overview raw response:', res);
		return res.data?.data?.overview;
	});
export const getCategoryStats = () =>
	api.get(`${API_BASE}/categories`).then(res => {
		console.log('API category stats raw response:', res);
		return res.data?.data;
	});
export const getBorrowingActivity = (days = 30) =>
	api.get(`${API_BASE}/activity?days=${days}`).then(res => {
		console.log('API borrowing activity raw response:', res);
		return res.data?.data;
	});
export const getCollectionGrowth = (months = 12) =>
	api.get(`${API_BASE}/collection-growth?months=${months}`).then(res => {
		console.log('API collection growth raw response:', res);
		return res.data?.data;
	});
export const getMemberStats = () =>
	api.get(`${API_BASE}/members`).then(res => {
		console.log('API member stats raw response:', res);
		return res.data?.data;
	});
export const getMostBorrowedBooks = (limit = 10) =>
	api.get(`${API_BASE}/most-borrowed?limit=${limit}`).then(res => {
		console.log('API most borrowed books raw response:', res);
		return res.data?.data;
	});
export const getOverdueBooks = () =>
	api.get(`${API_BASE}/overdue`).then(res => {
		console.log('API overdue books raw response:', res);
		return res.data?.data;
	});
