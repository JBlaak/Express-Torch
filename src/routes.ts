import Route from "./route";
import {compile} from 'path-to-regexp';

export default class Routes {

    /**
     * List of all routes in the application
     */
    private _routes: Array<Route>;

    /**
     * Get url of named route
     * @param name
     * @param args
     * @returns {string|undefined}
     */
    named(name: string, args: Object = {}): string|undefined {
        for (var key in this._routes) {
            if (this._routes[key].name === name) {
                return compile(this._routes[key].path)(args);
            }
        }
    }

    set routes(value: Array<Route>) {
        this._routes = value;
    }

    /**
     * Get a listing of all routes
     * @returns {Array<Route>}
     */
    all() {
        return this._routes;
    }
}