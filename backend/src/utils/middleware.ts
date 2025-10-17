import express from "express";
import type { NextFunction, Request, Response } from "express";
import logger from "./logger.js";
import jwt from "jsonwebtoken";
import config from "./config.js";

const unknownEndpoint = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(404).send({ error: "unknown endpoint" });
};
const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const errorHandler = (
    error: any, 
    request: Request,
    response: Response,
    next: NextFunction
) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } 
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

export const withUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req;
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ error: "missing token" });
    } else {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const csrfToken = req.headers["x-csrf-token"];
      if (
        typeof decodedToken === "object" &&
        decodedToken.id &&
        decodedToken.csrf == csrfToken
      ) {
        authReq.userId = decodedToken.id;
        next();
      } else {
        res.status(401).json({ error: "invalid token" });
      }
    }
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

export default { errorHandler, requestLogger, unknownEndpoint };