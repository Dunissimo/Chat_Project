import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { router as authRouter } from "./routes/auth";
import { errorMiddleware } from "./middlewares/error-middleware";
import { Server } from "socket.io";

dotenv.config();

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
    methods: ["GET", "POST"],
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
