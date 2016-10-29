import {Request, Response, NextFunction} from "express";

export default class Route {
    private _method: string;

    private _path: string;

    private _name: string | null;

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

    set method(value: string) {
        this._method = value;
    }

    get path(): string {
        return this._path;
    }

    get name(): string|any {
        return this._name;
    }

    set name(value: string|any) {
        this._name = value;
    }

    get middleware(): Array<(req: Request, res: Response, next: NextFunction) => any> {
        return this._middleware;
    }

    set middleware(value: Array<(req: Request, res: Response, next: NextFunction) => any>) {
        this._middleware = value;
    }

    get controller(): (req: Request, res: Response) => void {
        return this._controller;
    }

    set controller(value: (req: Request, res: Response) => void) {
        this._controller = value;
    }


}