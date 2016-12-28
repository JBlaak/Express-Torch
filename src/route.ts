import {Request, Response} from 'express';
import {Middleware} from './models/middleware';

export default class Route {
    private _method: string;

    private _path: string;

    private _name: string|undefined;

    private _middleware: Middleware[];

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

    get middleware(): Middleware[] {
        return this._middleware || [];
    }

    set middleware(value: Middleware[]) {
        this._middleware = value;
    }

    get name(): string|undefined {
        return this._name;
    }

    set name(value: string|undefined) {
        this._name = value;
    }
};
