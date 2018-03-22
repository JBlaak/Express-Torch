import {compile} from 'path-to-regexp';

import {Route} from './route';

export class Routes<T> {

    /**
     * List of all routes in the application
     */
    private _routes: Array<Route<T>>;

    set routes(value: Array<Route<T>>) {
        this._routes = value;
    }

    /**
     * Get url of named route
     * @param name
     * @param args
     * @returns {string|undefined}
     */
    public named(name: string, args: Object = {}): string|undefined {
        for (let key in this._routes) {
            if (this._routes[key].name === name) {
                return compile(this._routes[key].path)(args);
            }
        }
    }

    /**
     * Get a listing of all routes
     * @returns {Route[]}
     */
    public all() {
        return this._routes;
    }
}
