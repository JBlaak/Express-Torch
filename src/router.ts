import {Request, Response} from "express";
import {GroupConfig} from "./interfaces/group_config";
import {RouteConfig} from "./interfaces/route_config";
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
    get prefix():string {
        return this.config.prefix || '/';
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
        route.name = config.name;
        route.middleware = config.middleware;

        return route;
    }
}