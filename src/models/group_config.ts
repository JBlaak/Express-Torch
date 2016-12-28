import {Request, Response, NextFunction} from 'express';

export interface GroupConfig {
    middleware?: Array<(req: Request, res: Response, next: NextFunction) => any>;
    prefix?: string;
}
