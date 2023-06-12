import express from "express";
import { AuthController } from "../controllers/auth";

export const router = express.Router();
const authController = new AuthController();

router.post("/register/", async (req, res, next) => {
  try {
    console.log(req.body);

    const response = await authController.register(req.body);
    console.log(response);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/login/", async (req, res, next) => {
  try {
    const response = await authController.login(req.body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});
