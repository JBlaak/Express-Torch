import {Application} from 'express';

import transfer from './connect/transfer';
import {Middleware} from './models/middleware';
import {Route} from './route';
import {Router} from './router';
import {trim} from './util/trim';

export default function connect<T>(app: Application,
                                   router: Router<T>,
                                   previouxPrefix: string[] = [],
                                   previousMiddleware: Middleware[] = []): Array<Route<T>> {

    let routes: Array<Route<T>> = [];

    let prefix = [...previouxPrefix];
    if (router.prefix !== null) {
        prefix.push(router.prefix.replace(/^\/|\/$/g, ''));
    }

    /* Transfer each route to Express */
    router.routes.forEach((route: Route<T>) => {
        let path = '';
        if (prefix.length > 0) {
            path += '/' + prefix.join('/');
        }
        if (trim(route.path) !== '') {
            path += '/' + trim(route.path);
        }

        /* Transfer to Express */
        transfer(
            app,
            route.method,
            path,
            [...previousMiddleware, ...router.middleware, ...route.middleware],
            route.controller
        );

        /* Add to routes listing */
        const aggregatedRoute = new Route<T>(route.method, path, route.controller);
        aggregatedRoute.middleware = [...previousMiddleware, ...router.middleware, ...route.middleware];
        aggregatedRoute.name = route.name;
        aggregatedRoute.metadata = route.metadata;
        routes.push(aggregatedRoute);
    });

    /* Recursively transfer routes of each group as well including the parent middleware and prefix */
    router.groups.forEach((group: Router<T>) => {
        routes = [...routes, ...connect<T>(
            app,
            group,
            prefix,
            [...previousMiddleware, ...router.middleware]
        )];
    });

    return routes;
};
