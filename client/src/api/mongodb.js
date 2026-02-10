/**
 * MongoDB API Service
 * This file handles all MongoDB-related API calls from the frontend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Generic function to make API calls to backend MongoDB endpoints
 */
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

/**
 * User APIs
 */
export const userAPI = {
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (data) => apiCall('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  addSkill: (skill) => apiCall('/users/skills', { method: 'POST', body: JSON.stringify({ skill }) }),
  getSkills: () => apiCall('/users/skills'),
};

/**
 * Career APIs
 */
export const careerAPI = {
  getProfiles: () => apiCall('/career/profiles'),
  getProfile: (id) => apiCall(`/career/profiles/${id}`),
  createProfile: (data) => apiCall('/career/profiles', { method: 'POST', body: JSON.stringify(data) }),
};

/**
 * Report APIs
 */
export const reportAPI = {
  generateReport: () => apiCall('/report/generate'),
  getReportPDF: () => apiCall('/report/pdf'),
  getReportSummary: () => apiCall('/report/summary'),
  getCareerAnalysis: (roleName) => apiCall(`/report/career/${encodeURIComponent(roleName)}`),
  getHigherStudies: () => apiCall('/report/higher-studies'),
  getExams: () => apiCall('/report/exams'),
};

/**
 * Recommendations APIs
 */
export const recommendationAPI = {
  getRecommendations: () => apiCall('/recommendations'),
  getSkillGaps: () => apiCall('/recommendations/skill-gaps'),
};

/**
 * Auth APIs
 */
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  
  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => localStorage.getItem('token'),
  
  isAuthenticated: () => !!localStorage.getItem('token'),
};

/**
 * Admin APIs
 */
export const adminAPI = {
  getAllUsers: () => apiCall('/admin/users'),
  getUserStats: () => apiCall('/admin/stats'),
  updateUser: (id, data) => apiCall(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

export default {
  userAPI,
  careerAPI,
  reportAPI,
  recommendationAPI,
  authAPI,
  adminAPI,
};
