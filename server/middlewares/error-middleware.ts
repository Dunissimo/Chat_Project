import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";

export const errorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;

  res.status(status).send({ message: error.message });
};
