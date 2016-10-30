import {Request, Response, NextFunction} from "express";

export default class Route {
    private _method: string;

    private _path: string;

    private _middleware: Array<(req: Request, res: Response, next: NextFunction) => any>;

    private _controller: (req: Request, res: Response) => void;

    constructor(method: string, path: string, controller: (req: Request, res: Response) => void) {
        this._method = method;
        this._path = path;
        this._controller = controller;
    }

    get method(): string {
        return this._method;
    }

    get path(): string {
        return this._path;
    }

    get controller(): (req: Request, res: Response) => void {
        return this._controller;
    }

    get middleware(): Array<(req: Request, res: Response, next: NextFunction) => any> {
        return this._middleware || [];
    }

    set middleware(value: Array<(req: Request, res: Response, next: NextFunction) => any>) {
        this._middleware = value;
    }

}