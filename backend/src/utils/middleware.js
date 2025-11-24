import express from "express";
import logger from "./logger.js";
import jwt from "jsonwebtoken";
import config from "./config.js";
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
};
const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
export const withUser = async (req, res, next) => {
    try {
        const authReq = req;
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ error: "missing token" });
        }
        else {
            const decodedToken = jwt.verify(token, config.JWT_SECRET);
            const csrfToken = req.headers["x-csrf-token"];
            if (typeof decodedToken === "object" &&
                decodedToken.id &&
                decodedToken.csrf == csrfToken) {
                authReq.userId = decodedToken.id;
                next();
            }
            else {
                res.status(401).json({ error: "invalid token" });
            }
        }
    }
    catch (error) {
        res.status(401).json({ error: "invalid token" });
    }
};
export default { errorHandler, requestLogger, unknownEndpoint };
//# sourceMappingURL=middleware.js.map