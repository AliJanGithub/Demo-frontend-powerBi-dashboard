import axios from 'axios';

// Get the current hostname from the browser
const currentHostname = window.location.hostname;
const currentProtocol = window.location.protocol; // e.g., 'http:' or 'https:'

// 1. Determine the API Port for local development
// We use a helper function to decide if we should append the port (:5000)
// This is crucial for local testing with lvh.me, where the backend runs on a different port.
const getApiPort = (hostname) => {
    // If running in development and using lvh.me or localhost, use port 5000
    if (import.meta.env.DEV || hostname.includes('lvh.me') || hostname.includes('localhost')) {
        return ':5000';
    }
    // In production, assume the backend is served from the same port (or handled by a proxy)
    return '';
};

const apiPort = getApiPort(currentHostname);

// 2. Determine the dynamic API Base URL
let API_BASE_URL;

// Check for the base domain (SUPERADMIN) vs. subdomain (TENANT) logic

// The hostname logic:
// - 'localhost' or 'lvh.me' (parts.length <= 2) = SUPERADMIN
// - 'softlyfy.lvh.me' (parts.length > 2) = TENANT

if (currentHostname.includes('localhost')) {
    // Case 1: Local development on localhost
    API_BASE_URL = `${currentProtocol}//${currentHostname}${apiPort}/api`;
} else if (currentHostname.split('.').length <= 2) {
    // Case 2: Base domain (e.g., lvh.me or yourdomain.com) for SUPERADMIN
    API_BASE_URL = `${currentProtocol}//${currentHostname}${apiPort}/api`;
} else {
    // Case 3: Subdomain (e.g., softlyfy.lvh.me or tenant.yourdomain.com) for TENANT
    API_BASE_URL = `${currentProtocol}//${currentHostname}${apiPort}/api`;
}

// Optional: Fallback/Override from env variable if explicitly set (useful for server-side rendering/testing)
// NOTE: If you use the VITE_API_URL, ensure it already has the full domain/subdomain needed.
// For dynamic subdomains, it's safer to comment this out or use it only for localhost fallback.
// const finalBaseUrl = import.meta.env.VITE_API_URL || API_BASE_URL;
const finalBaseUrl = API_BASE_URL;


// --- Axios Configuration ---

const api = axios.create({
  baseURL: finalBaseUrl, // Use the dynamically calculated URL
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API Client Base URL:', finalBaseUrl); // Log to verify in the browser console

// ... (Rest of your interceptors remain the same) ...

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
         // IMPORTANT: Use the 'api' instance's calculated baseURL for the refresh request
        const response = await axios.post(`${finalBaseUrl}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;