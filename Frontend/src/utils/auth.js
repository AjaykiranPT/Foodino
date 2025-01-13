import { decodeToken } from '../middleware/jwtDecode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded && decoded.exp * 1000 > Date.now(); // Check if token is expired
};
