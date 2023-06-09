import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controllers/auth";
import { CustomError } from "../utils/custom-error";

export const router = express.Router();
const authController = new AuthController();

router.post("/auth/register/", async (req, res, next) => {
  try {
    const user = await authController.register(req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/auth/login/", async (req, res, next) => {
  try {
    const token = await authController.login(req.body);

    res.json(token);
  } catch (error) {
    next(error);
  }
});
