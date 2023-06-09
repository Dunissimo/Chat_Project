import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth";

export const router = express.Router();
const authController = new AuthController();

router.post("/auth/register/", async (req: Request, res: Response, next) => {
  try {
    const user = await authController.register(req.body);

    res.json(user);
  } catch (error) {
    const err = error as Error;
    res.json({ error: err.name, message: err.message });
  }
});

router.post("/auth/login/", async (req: Request, res: Response) => {
  try {
    const token = await authController.login(req.body);

    res.json(token);
  } catch (error) {
    const { name, message } = error as Error;
    res.json({ error: name, message });
  }
});
