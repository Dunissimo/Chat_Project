const API_BASE = "http://192.168.142.157:1234/api";

export const apiRoutes = {
  registerUser: `${API_BASE}/auth/register/`,
  loginUser: `${API_BASE}/auth/login/`,
};
