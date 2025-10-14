import express from "express";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import recipeRouter from "./controllers/recipes.js"; 
import middleware from "./utils/middleware.js";

const app = express();

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
app.use("/api/recipes", recipeRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
