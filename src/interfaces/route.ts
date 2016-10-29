import {Request, Response, NextFunction} from "express";

export interface Route {
    path: string,
    method: string,
    name: string | null,
    middleware: Array<(req: Request, res: Response, next: NextFunction) => any>,
    controller: (req: Request, res: Response) => void
}

