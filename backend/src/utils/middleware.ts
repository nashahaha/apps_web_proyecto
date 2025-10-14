import express from "express";
import type { NextFunction, Request, Response } from "express";
import logger from "./logger.js";

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

export default { errorHandler, requestLogger, unknownEndpoint };