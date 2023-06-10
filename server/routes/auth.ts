import express from "express";
import { AuthController } from "../controllers/auth";

export const router = express.Router();
const authController = new AuthController();

router.post("/auth/register/", async (req, res, next) => {
  try {
    const response = await authController.register(req.body);
    console.log(response);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/auth/login/", async (req, res, next) => {
  try {
    const response = await authController.login(req.body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});
