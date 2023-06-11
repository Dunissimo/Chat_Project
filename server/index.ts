import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error-middleware";
import { router as authRouter } from "./routes/auth";

process.env.NODE_ENV == "dev"
  ? dotenv.config({ path: "./configs/dev.env" })
  : dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", authRouter);
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
