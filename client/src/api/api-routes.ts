const API_BASE =
  import.meta.env.MODE === "dev"
    ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`
    : `${import.meta.env.VITE_PROD_API_URL}`;

console.log(API_BASE);

export const apiRoutes = {
  base: API_BASE,
  registerUser: API_BASE + "/api/auth/register/",
  loginUser: API_BASE + "/api/auth/login/",
  users: API_BASE + "/api/users/",
};
