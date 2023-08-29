import {Router,  Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { ValidateError } from "tsoa";

export function ErrorHandling(app: Router) { 
    
    app.use(function notFoundHandler(_req, res: ExResponse) {
        res.status(404).send({
          message: "Not Found",
        });
      });
    
      app.use(function errorHandler(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
      ): ExResponse | void {
        if (err instanceof ValidateError) {
          console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
          return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
          });
        }
        if (err instanceof Error) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
      
        next();
      });
}