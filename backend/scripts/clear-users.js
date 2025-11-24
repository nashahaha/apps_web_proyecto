import mongoose from "mongoose";
import UserModel from "../src/models/users.js";
import config from "../src/utils/config.js";
import logger from "../src/utils/logger.js";
const clearUsers = async () => {
    try {
        if (!config.MONGODB_URI) {
            logger.error("MONGODB_URI is not defined");
            process.exit(1);
        }
        logger.info("Connecting to MongoDB...");
        await mongoose.connect(config.MONGODB_URI);
        logger.info("Connected to MongoDB");
        // Contar usuarios antes de limpiar
        const countBefore = await UserModel.countDocuments();
        logger.info(`Usuarios en BD antes de limpiar: ${countBefore}`);
        // Limpiar usuarios
        await UserModel.deleteMany({});
        // Verificar que se limpia
        const countAfter = await UserModel.countDocuments();
        logger.info(`Usuarios en BD después de limpiar: ${countAfter}`);
        await mongoose.connection.close();
        logger.info("Usuarios eliminados de la base de datos");
    }
    catch (error) {
        logger.error("Error al limpiar usuarios:", error);
        process.exit(1);
    }
};
clearUsers();
//# sourceMappingURL=clear-users.js.map