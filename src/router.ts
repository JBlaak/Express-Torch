import {Request, Response, NextFunction} from "express";
import {GroupConfig} from "./models/group_config";
import {RouteConfig} from "./models/route_config";
import Route from "./route";

export default class Router {

    /**
     * Configuration of this group, will be applied nested when transferred to Expresss
     */
    private config?: GroupConfig;

    /**
     * List of all groups beneath this one
     */
    private _groups: Array<Router> = [];

    /**
     * The different routes applicable in this router
     */
    private _routes: Array<Route> = [];

    /**
     * Setup configuration
     * @param config
     */
    constructor(config?: GroupConfig) {
        this.config = config;
    }

    /**
     * Getter for groups
     */
    get groups(): Array<Router> {
        return this._groups;
    }

    /**
     * Getter for routes
     */
    get routes(): Array<Route> {
        return this._routes;
    }

    /**
     * Get prefix for routes of this router
     * @returns {string|string}
     */
    get middleware(): Array<(req: Request, res: Response, next: NextFunction) => any> {
        if (this.config) {
            return this.config.middleware || [];
        }
        return [];
    }

    /**
     * Get prefix for routes of this router
     * @returns {string|null}
     */
    get prefix():string|null {
        if (this.config) {
            return this.config.prefix || null;
        }
        return null;
    }

    /**
     * GET method
     * @param path
     * @param config
     */
    public get(path: string, config: ((req: Request, res: Response) => void) | RouteConfig) {
        const route = this.toRoute('get', path, config);

        this._routes.push(route);
    }

    /**
     * POST method
     * @param path
     * @param config
     */
    public post(path: string, config: ((req: Request, res: Response) => void) | RouteConfig) {
        const route = this.toRoute('post', path, config);

        this._routes.push(route);
    }

    /**
     * PUT method
     * @param path
     * @param config
     */
    public put(path: string, config: ((req: Request, res: Response) => void) | RouteConfig) {
        const route = this.toRoute('put', path, config);

        this._routes.push(route);
    }

    /**
     * DELETE method
     * @param path
     * @param config
     */
    public delete(path: string, config: ((req: Request, res: Response) => void) | RouteConfig) {
        const route = this.toRoute('delete', path, config);

        this._routes.push(route);
    }

    /**
     * Register a new group of routes with their own configurations
     * @param config
     * @param callback
     */
    public group(config: GroupConfig, callback: (router: Router) => void) {
        const router = new Router(config);

        callback(router);

        this._groups.push(router);
    }

    /**
     * Transform to route
     * @param method
     * @param path
     * @param controller
     * @returns Route
     */
    private toRoute(method: string, path: string, controller: ((req: Request, res: Response) => void) | RouteConfig): Route {
        if (typeof controller === 'function') {
            return new Route(method, path, (controller as ((req: Request, res: Response) => void)));
        }

        const config = (controller as RouteConfig);

        const route = new Route(method, path, config.controller);
        route.middleware = config.middleware;

        return route;
    }
}