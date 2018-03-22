import {Request, Response, NextFunction} from 'express';

export type NormalMiddleware = (req: Request, res: Response, next: NextFunction) => any;
export type ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => any;

export type Middleware = NormalMiddleware | ErrorMiddleware;
