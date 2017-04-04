import {Request, Response, NextFunction} from 'express';
import {Controller} from './controller';
import {Middleware} from './middleware';

export interface RouteConfig {
    method?: string;
    name?: string;
    middleware?: Middleware[];
    controller: Controller;
}
