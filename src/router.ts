import {Controller} from './models/controller';
import {GroupConfig} from './models/group_config';
import {Middleware} from './models/middleware';
import {RouteConfig} from './models/route_config';
import Route from './route';

export default class Router {

    /**
     * Configuration of this group, will be applied nested when transferred to Expresss
     */
    private _config: GroupConfig;

    /**
     * List of all groups beneath this one
     */
    private _groups: Router[] = [];

    /**
     * The different routes applicable in this router
     */
    private _routes: Route[] = [];

    /**
     * Setup configuration
     * @param config
     */
    constructor(config: GroupConfig) {
        this._config = config;
    }

    /**
     * Getter for groups
     */
    get groups(): Router[] {
        return this._groups;
    }

    /**
     * Getter for routes
     */
    get routes(): Route[] {
        return this._routes;
    }

    /**
     * Get prefix for routes of this router
     * @returns {string|string}
     */
    get middleware(): Middleware[] {
        return this._config.middleware || [];
    }

    /**
     * Get prefix for routes of this router
     * @returns {string|null}
     */
    get prefix(): string|null {
        return this._config.prefix || null;
    }

    /**
     * GET method
     * @param path
     * @param config
     */
    public get(path: string, config: Controller | RouteConfig): Route {
        const route = this.toRoute('get', path, config);

        this._routes.push(route);

        return route;
    }

    /**
     * POST method
     * @param path
     * @param config
     */
    public post(path: string, config: Controller | RouteConfig): Route {
        const route = this.toRoute('post', path, config);

        this._routes.push(route);

        return route;
    }

    /**
     * PUT method
     * @param path
     * @param config
     */
    public put(path: string, config: Controller | RouteConfig): Route {
        const route = this.toRoute('put', path, config);

        this._routes.push(route);

        return route;
    }

    /**
     * DELETE method
     * @param path
     * @param config
     */
    public delete(path: string, config: Controller | RouteConfig): Route {
        const route = this.toRoute('delete', path, config);

        this._routes.push(route);

        return route;
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
    private toRoute(method: string, path: string, controller: Controller | RouteConfig): Route {
        if (typeof controller === 'function') {
            return new Route(method, path, (controller as Controller));
        }

        const config = (controller as RouteConfig);

        const route = new Route(
            config.method ? config.method : method,
            path,
            config.controller
        );
        route.name = config.name;
        if (config.middleware) {
            route.middleware = config.middleware;
        }

        return route;
    }
};
