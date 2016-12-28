import {Request, Response, NextFunction} from 'express';

export interface RouteConfig {
    method?: string;
    name?: string;
    middleware?: Array<(req: Request, res: Response, next: NextFunction) => any>;
    controller: (req: Request, res: Response) => void;
}
