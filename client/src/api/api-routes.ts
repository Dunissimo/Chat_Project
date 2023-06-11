const API_BASE =
  import.meta.env.MODE === "development"
    ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api`
    : `${import.meta.env.VITE_PROD_API_URL}/api`;

export const apiRoutes = {
  registerUser: API_BASE + "/auth/register/",
  loginUser: API_BASE + "/auth/login/",
};
