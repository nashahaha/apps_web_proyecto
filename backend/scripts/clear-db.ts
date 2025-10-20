import mongoose from "mongoose";
import RecipeModel from "../src/models/recipe.js";
import config from "../src/utils/config.js";
import logger from "../src/utils/logger.js";

const clearDb = async () => {
  try {
    if (!config.MONGODB_URI) {
      logger.error("MONGODB_URI is not defined");
      process.exit(1);
    }
    
    logger.info("Connecting to MongoDB...");
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
    //contar recetas antes de limpiar
    const countBefore = await RecipeModel.countDocuments();
    logger.info(`Recetas en BD antes de limpiar: ${countBefore}`);
    //limpiar bd
    await RecipeModel.deleteMany({});
    //verificar que se limpia
    const countAfter = await RecipeModel.countDocuments();
    logger.info(`Recetas en BD después de limpiar: ${countAfter}`);
    await mongoose.connection.close();
    logger.info("Base de datos limpiada");
  } catch (error) {
    logger.error("Error al limpiar la base de datos:", error);
    process.exit(1);
  }
};

clearDb();
