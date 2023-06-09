import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./db";
import cors from "cors";
import { router as authRouter } from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", authRouter);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TS server`);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});
