import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authService = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
  
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
};

// User endpoints
export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Horse endpoints
export const horseService = {
  getAll: async () => {
    const response = await api.get('/horses');
    return response.data;
  },
  
  getOne: async (id: string) => {
    const response = await api.get(`/horses/${id}`);
    return response.data;
  },
  
  create: async (name: string, gender: string) => {
    const response = await api.post('/horses', { name, gender });
    return response.data;
  },
  
  train: async (horseId: string, skillId: string, duration: number) => {
    const response = await api.post('/horses/train', { horseId, skillId, duration });
    return response.data;
  },
  
  updateHousing: async (horseId: string, housing: string) => {
    const response = await api.put(`/horses/${horseId}/housing`, { housing });
    return response.data;
  },

  rename: async (id: string, name: string) => {
    const response = await api.put(`/horses/${id}/rename`, { name });
    return response.data;
  }
};

// Breeding endpoints
export const breedingService = {
  breed: async (sireId: string, damId: string, foalName: string) => {
    const response = await api.post('/breeding', { sireId, damId, foalName });
    return response.data;
  },
};

// Game endpoints
export const gameService = {
  getState: async () => {
    const response = await api.get('/game/state');
    return response.data;
  },
  
  advanceDay: async () => {
    const response = await api.post('/game/advance-day');
    return response.data;
  },

  doChore: async (choreId: string) => {
    const response = await api.post('/game/do-chore', { choreId });
    return response.data;
  }
};

export default api;
