import {Request, Response} from "express";
import {GroupConfig} from "./interfaces/group_config";
import {Route} from "./interfaces/route";
import {RouteConfig} from "./interfaces/route_config";

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
     * @param config
     * @returns Route
     */
    private toRoute(method: string, path: string, config: ((req: Request, res: Response) => void) | RouteConfig): Route {
        if (typeof config === 'function') {
            config = {
                name: null,
                middleware: [],
                controller: (config as ((req: Request, res: Response) => void))
            }
        }

        return {
            path: path,
            method: method,
            name: config.name || null,
            middleware: config.middleware || [],
            controller: config.controller
        };
    }
}