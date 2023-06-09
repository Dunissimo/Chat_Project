import jwt from "jsonwebtoken";

export const generateJWT = (username: string) => {
  return jwt.sign(username, process.env.JWT_SECRET!);
};
