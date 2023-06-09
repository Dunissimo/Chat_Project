import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error-middleware";
import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(errorMiddleware);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);

  io.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log("Server is running on", port);
});
