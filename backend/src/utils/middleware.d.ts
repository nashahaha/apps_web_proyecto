import express from "express";
import type { NextFunction, Request, Response } from "express";
export declare const withUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    errorHandler: (error: any, request: Request, response: Response, next: NextFunction) => express.Response<any, Record<string, any>> | undefined;
    requestLogger: (request: Request, response: Response, next: NextFunction) => void;
    unknownEndpoint: (request: Request, response: Response, next: NextFunction) => void;
};
export default _default;
//# sourceMappingURL=middleware.d.ts.map