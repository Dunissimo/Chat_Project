import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom-error";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    throw new CustomError(401, "Пользователь не авторизован");
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    console.log(err);

    if (err) {
      throw new CustomError(
        403,
        "У пользователя нет прав или требуется повторная авторизация"
      );
    }

    // @ts-ignore
    req.user = user;

    next();
  });
};
