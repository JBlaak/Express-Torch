import {Request, Response, NextFunction} from 'express';
import {Middleware} from './middleware';

export interface GroupConfig {
    middleware?: Middleware[];
    prefix?: string;
    context?: any;
}
