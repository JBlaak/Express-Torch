import {Request, Response} from 'express';

export type Controller = (req: Request, res: Response) => void;
