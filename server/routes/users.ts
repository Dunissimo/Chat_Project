import express from "express";
import { usersController } from "../controllers/users";

export const router = express.Router();

router.patch("/:id", async (req, res, next) => {
  try {
    const response = await usersController.updateUser(req.body, +req.params.id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
