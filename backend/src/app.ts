import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import recipeRouter from "./controllers/recipes.js";
import middleware from "./utils/middleware.js";
import authRouter from "./controllers/auth.js";
import usersRouter from "./controllers/users.js";
import path from "path";
import testingRouter from "./controllers/testing.js";

const app = express();

//configurar conexion de front
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose.set("strictQuery", false);
if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
    });
}

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // para el manejo de imagenes
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const uploadsPath = path.resolve(process.cwd(), "uploads");

export default app;
