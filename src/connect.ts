import {Application} from 'express';

import transfer from './connect/transfer';
import {Middleware} from './models/middleware';
import Route from './route';
import Router from './router';
import {trim} from './util/trim';

export default function connect(app: Application,
                                router: Router,
                                previouxPrefix: string[] = [],
                                previousMiddleware: Middleware[] = []): Route[] {

    let routes: Route[] = [];

    let prefix = [...previouxPrefix];
    if (router.prefix !== null) {
        prefix.push(trim(router.prefix));
    }

    /* Transfer each route to Express */
    router.routes.forEach((route: Route) => {
        let path = '';
        if (prefix.length > 0) {
            path += '/' + prefix.join('/');
        }
        if (trim(route.path) !== '') {
            path += '/' + trim(route.path);
        }

        /* Add where constraints */
        const constraints = route.getConstraints();
        if (constraints !== undefined) {
            for (let key in constraints) {
                // Tell istanbul to ignore the else branch, else the code coverage will go below 100%
                // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignore-an-else-path
                /* istanbul ignore else  */
                if (constraints.hasOwnProperty(key)) {
                    path = path.replace(key, key + constraints[key]);
                }
            }
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
        const aggregatedRoute = new Route(route.method, path, route.controller);
        aggregatedRoute.middleware = [...previousMiddleware, ...router.middleware, ...route.middleware];
        aggregatedRoute.name = route.name;
        routes.push(aggregatedRoute);
    });

    /* Recursively transfer routes of each group as well including the parent middleware and prefix */
    router.groups.forEach((group: Router) => {
        routes = [...routes, ...connect(
            app,
            group,
            prefix,
            [...previousMiddleware, ...router.middleware]
        )];
    });

    return routes;
};
